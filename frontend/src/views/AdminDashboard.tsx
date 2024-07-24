/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import {
  Exact,
  GetUserQueryQuery,
  GetUserWithLinkQuery,
  Scalars,
} from "@/__generated__/graphql";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ADD_LINK_MUTATION,
  DELETE_LINK_MUTATION,
  EDIT_BACKGROUND_MUTATION,
  REMOVE_IMAGE_MUTATION,
  UPDATE_LINK_MUTATION,
  UPDATE_USER_MUTATION,
  USER_QUERY_WITH_LINK,
} from "@/lib/graphql";
import { cn } from "@/lib/utils";
import { useUploadThing } from "@/utils/uploadthing";
import { ApolloQueryResult, useMutation, useQuery } from "@apollo/client";
import { useDropzone } from "@uploadthing/react";
import {
  CircleHelp,
  GripVertical,
  Image as ImageIcon,
  Loader,
  Plus,
  ScanEye,
  Trash,
  Upload,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { SocialIcon } from "react-social-icons";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useDebounceCallback } from "usehooks-ts";
import { z } from "zod";

import {
  DragDropContext,
  Draggable,
  DraggableProvidedDragHandleProps,
  Droppable,
} from "@hello-pangea/dnd";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const DEBOUNCE_TIME = 1500;

interface Links {
  id: number;
  title?: string;
  url?: string;
  show_icon?: boolean;
  uploaded_icon?: string | null | undefined;
}

const AdminDashboard = ({
  userData,
}: {
  userData: NonNullable<GetUserQueryQuery["getUser"]>;
}) => {
  const {
    data: user,
    refetch,
    loading: userQueryLoading,
    client,
  } = useQuery(USER_QUERY_WITH_LINK, {
    variables: {
      email: userData.email,
    },
  });

  const [updateUser, { loading: updateLoading }] =
    useMutation(UPDATE_USER_MUTATION);

  const [updateLink, { loading: isUpdateLinkLoading }] =
    useMutation(UPDATE_LINK_MUTATION);

  const [createLinkMutation, { loading: isCreateLoading }] =
    useMutation(ADD_LINK_MUTATION);

  const [removeImageMutation, { loading: isRemoveImageLoading }] = useMutation(
    REMOVE_IMAGE_MUTATION,
  );

  const [deleteLinkMutation, { loading: isDeleteLinkLoading }] =
    useMutation(DELETE_LINK_MUTATION);

  const [links, setLinks] = useState<Links[]>([]);

  const profile_title = z.string().min(1).max(100);
  const bio = z.string().min(1).max(250);

  const handleChangeTitle = useDebounceCallback(async (value: string) => {
    try {
      profile_title.parse(value);
      await updateUser({
        variables: {
          value: {
            id: userData.id,
            profile_title: value,
          },
        },
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  }, DEBOUNCE_TIME);

  const handleChangeBio = useDebounceCallback(async (value: string) => {
    try {
      bio.parse(value);
      await updateUser({
        variables: {
          value: {
            id: userData.id,
            bio: value,
          },
        },
      });
      await refetch();
    } catch (error) {
      console.log(error);
    }
  }, DEBOUNCE_TIME);

  const handleEditLink = useCallback(async (link: Links) => {
    try {
      await updateLink({
        variables: {
          value: {
            id: link.id,
            title: link.title,
            url: link.url,
            show_icon: link.show_icon,
          },
        },
      });
      await refetch();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleRemoveImage = useCallback(async (id: number) => {
    try {
      await removeImageMutation({
        variables: {
          removeImageId: id,
        },
      });
      await refetch();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleDeleteLink = useCallback(async (id: number) => {
    try {
      setLinks((current) => current.filter((link) => link.id !== id));
      await deleteLinkMutation({
        variables: {
          removeImageId: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (user?.getUser?.links) {
      setLinks([
        ...user?.getUser?.links?.map((link) => {
          return {
            id: link.id,
            title: link.title,
            url: link.url,
            show_icon: link.show_icon,
            uploaded_icon: link.uploaded_icon,
          };
        }),
      ]);
    }
  }, [user]);

  return (
    <fieldset className="h-full w-full border border-dashed p-3">
      <legend className="px-2 text-sm">Admin Dashboard</legend>

      <div className="flex h-full w-full gap-10">
        <ScrollArea className="h-[calc(100vh-10.25rem)] w-full">
          <div className="space-y-3">
            <div className="">
              <Label htmlFor="profile-title">Profile Title</Label>
              <Input
                id="profile-title"
                placeholder="Enter your title"
                onChange={(e) => handleChangeTitle(e.target.value)}
                defaultValue={user?.getUser?.profile_title ?? ""}
                maxLength={100}
              />
            </div>

            <div className="">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                placeholder="Enter your bio"
                id="bio"
                defaultValue={user?.getUser?.bio ?? ""}
                onChange={(e) => handleChangeBio(e.target.value)}
                maxLength={250}
              />
            </div>

            <Button
              className="w-full rounded-md bg-accent hover:bg-accent/80"
              disabled={isCreateLoading}
              onClick={async () => {
                if (links.length >= 5) {
                  toast.error("Free users can only have 5 links");
                  return;
                }
                const { data } = await createLinkMutation({
                  variables: {
                    value: {
                      user_id: userData.id,
                      order: links.length + 1,
                      title: "",
                      url: "",
                      show_icon: false,
                    },
                  },
                });

                const link_id = data?.addLink?.id;

                setLinks((current) => [
                  ...current,
                  {
                    id: link_id!,
                    title: "",
                    url: "",
                    show_icon: false,
                    uploaded_icon: null,
                  },
                ]);
              }}
            >
              {isCreateLoading ? (
                <Loader size={18} className="animate-spin" />
              ) : (
                <>
                  <Plus size={18} />
                  Add link
                </>
              )}
            </Button>
          </div>

          <DragDropContext
            onDragEnd={(result) => {
              const items = Array.from(links);
              const [reorderedItem] = items.splice(result.source.index, 1);
              items.splice(
                result.destination?.index ?? result.source.index,
                0,
                reorderedItem,
              );

              setLinks(items);

              Promise.all(
                items.map((link, index) => {
                  updateLink({
                    variables: {
                      value: {
                        id: link.id,
                        order: index + 1,
                        title: link.title,
                        url: link.url,
                        show_icon: link.show_icon,
                      },
                    },
                  });
                }),
              );
            }}
          >
            <Droppable droppableId="links">
              {(provided) => (
                <ul
                  className="links flex flex-col"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {links.map((link, index) => (
                    <Draggable
                      key={link.id}
                      draggableId={link.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          className=""
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <div className="h-2 w-full"></div>
                          <LinkComponent
                            link={link}
                            dragProps={provided.dragHandleProps}
                            handleEditLink={handleEditLink}
                            handleRemoveImage={handleRemoveImage}
                            handleDeleteLink={handleDeleteLink}
                            refetch={refetch}
                          />
                          <div className="h-2 w-full"></div>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </ScrollArea>
        <div className="relative hidden h-full w-full flex-col items-center rounded-md bg-slate-100 p-5 pt-10 md:flex">
          <div
            className={cn("absolute left-3 top-3 hidden items-center gap-2", {
              flex:
                updateLoading ||
                isUpdateLinkLoading ||
                isRemoveImageLoading ||
                isDeleteLinkLoading,
            })}
          >
            <Loader className="animate-spin" size={18} />
            <p className="text-sm">Saving</p>
          </div>
          {userQueryLoading ? (
            <PreviewSkeleton />
          ) : (
            <LinkPreview user={user} links={links} />
          )}
        </div>

        <Drawer>
          <DrawerTrigger className="fixed bottom-8 left-0 right-0 mx-auto flex h-20 w-20 flex-col items-center justify-center rounded-md border bg-white md:hidden">
            <ScanEye />
            <p className="text-sm">Preview</p>
          </DrawerTrigger>
          <DrawerContent className="h-[90vh]">
            <DrawerHeader>
              <DrawerTitle>Preview</DrawerTitle>
            </DrawerHeader>
            <div className="flex flex-col items-center justify-center space-y-4 p-5">
              <LinkPreview user={user} links={links} />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </fieldset>
  );
};

const LinkComponent = ({
  link,
  dragProps,
  handleEditLink,
  handleRemoveImage,
  handleDeleteLink,
  refetch,
}: {
  link: Links;
  dragProps: DraggableProvidedDragHandleProps | null;
  handleEditLink: (link: Links) => void;
  handleRemoveImage: (id: number) => void;
  handleDeleteLink: (id: number) => void;
  refetch: (
    variables?:
      | Partial<
          Exact<{
            email: Scalars["String"]["input"];
          }>
        >
      | undefined,
  ) => Promise<ApolloQueryResult<GetUserWithLinkQuery>>;
}) => {
  const [title, setTitle] = useState(link.title);
  const [url, setUrl] = useState(link.url);
  const [show_icon, setShowIcon] = useState(link.show_icon);
  const [uploaded_icon, setUploadedIcon] = useState(link.uploaded_icon);

  const handleEdit = () => {
    try {
      handleEditLink({
        id: link.id,
        title,
        url,
        show_icon,
        uploaded_icon,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeTitle = useDebounceCallback((value: string) => {
    setTitle(value);
  }, DEBOUNCE_TIME);

  const handleChangeUrl = useDebounceCallback((value: string) => {
    setUrl(value);
  }, DEBOUNCE_TIME);

  const handleChangeCheck = ({ value }: { value: boolean }) => {
    setShowIcon(value);
  };

  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 1) {
      toast.error("Please upload only one file");
      return;
    }
    const iconUrl = URL.createObjectURL(acceptedFiles[0]);
    setUploadedIcon(iconUrl);
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onUploadBegin: (progress) => {
      toast.loading("Uploading image", {
        id: "uploading",
        duration: 100,
      });
    },
    onClientUploadComplete: async () => {
      await refetch();
      toast.dismiss("uploading");
      toast.success("Image uploaded successfully");
    },
  });

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  useEffect(() => {
    handleEdit();
  }, [title, url, show_icon, uploaded_icon]);

  useEffect(() => {
    if (link.uploaded_icon) {
      setUploadedIcon(link.uploaded_icon);
    }
  }, []);

  return (
    <div className="flex w-full items-center gap-2 space-y-2 rounded-md border bg-white p-2 pb-3 pr-4 shadow-sm">
      <div className="flex h-44 items-center" {...dragProps}>
        <GripVertical strokeWidth="1" />
      </div>
      <div className="w-full space-y-3">
        <div className="">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Type your title here"
            onChange={(e) => {
              const value = e.target.value;
              handleChangeTitle(value);
            }}
            maxLength={100}
            defaultValue={title}
          />
        </div>

        <div className="">
          <Label htmlFor="url">URL</Label>
          <Input
            placeholder="Type your URL here"
            id="url"
            onChange={(e) => {
              const value = e.target.value;
              handleChangeUrl(value);
            }}
            maxLength={250}
            defaultValue={url}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Dialog>
                    <DialogTrigger>
                      <ImageIcon
                        size={18}
                        strokeWidth={1.2}
                        className="opacity-50 transition-all duration-300 ease-in-out hover:opacity-100"
                      />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Upload an icon</DialogTitle>
                        <DialogDescription>
                          This will override the default icon that we provide
                          based on the URL input.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex w-full flex-col items-center justify-center gap-3">
                        <div className="flex w-24 flex-col items-center justify-center space-y-2">
                          {uploaded_icon ? (
                            <div className="relative h-12 w-12 rounded-full bg-black">
                              <Image
                                src={uploaded_icon as string}
                                alt="Icon"
                                width={200}
                                height={200}
                                className="h-full w-full"
                              />
                            </div>
                          ) : (
                            <SocialIcon
                              url={link.url}
                              className=""
                              as="div"
                              style={{ width: 40, height: 40 }}
                            />
                          )}

                          <p className="text-xs">Current icon</p>
                        </div>

                        <div
                          {...getRootProps()}
                          className="inset flex w-full cursor-pointer items-center justify-center rounded-xl bg-slate-100 py-4 outline-dashed outline-black/20"
                        >
                          <input {...getInputProps()} />
                          <div className="flex flex-col items-center gap-1 opacity-60">
                            <Upload />
                            <p className="text-sm">Drop files here!</p>
                          </div>
                        </div>
                      </div>

                      <DialogFooter className="mt-2 flex w-full gap-1">
                        <DialogClose asChild>
                          <Button
                            className="w-full"
                            variant={"destructive"}
                            onClick={async () => {
                              handleRemoveImage(link.id);
                              setUploadedIcon(undefined);
                            }}
                          >
                            Reset to default
                          </Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button
                            className="w-full"
                            onClick={async () => {
                              try {
                                await startUpload(files, {
                                  id: link.id,
                                });
                              } catch (error) {
                                console.log(error);
                              }
                            }}
                          >
                            Save
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upload icon</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Dialog>
                    <DialogTrigger>
                      <Trash
                        size={18}
                        strokeWidth={1.2}
                        className="opacity-50 transition-all duration-300 ease-in-out hover:opacity-100"
                      />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently
                          delete this link from our servers.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="flex w-full gap-2">
                        <DialogClose asChild>
                          <Button className="w-full" variant={"secondary"}>
                            Cancel
                          </Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button
                            className="w-full"
                            variant={"destructive"}
                            onClick={async () => {
                              handleDeleteLink(link.id);
                            }}
                          >
                            Delete
                          </Button>
                        </DialogClose>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex items-center justify-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="my-auto h-fit">
                    <CircleHelp
                      size={16}
                      strokeWidth={1.2}
                      className="opacity-50 transition-all duration-300 ease-in-out hover:opacity-100"
                    />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    We automatically add the icon based on the URL input. If the
                    URL is not invalid, we may not be able to get its icon. See
                    the available icons{" "}
                    <Link
                      target="_blank"
                      href="https://camo.githubusercontent.com/bb10ce76806a2db855ae9411682342b31f2857ce8ab62b8c0a46d3c3cdb77fdf/68747470733a2f2f7374617469632e72656163742d736f6369616c2d69636f6e732e636f6d2f726561646d652d696d6167652e706e67"
                      className="text-accent underline"
                    >
                      here
                    </Link>{" "}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Label htmlFor="thumbnail">Show icon</Label>

            <Switch
              checked={show_icon}
              id="thumbnail"
              className="bg-accent"
              onCheckedChange={(value) => {
                handleChangeCheck({ value });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const LinkPreview = ({
  user,
  links,
}: {
  user: GetUserWithLinkQuery | undefined;
  links: Links[];
}) => {
  return (
    <>
      <div className="relative z-10 flex w-full flex-col items-center">
        <Image
          src={(user?.getUser?.image as string) ?? ""}
          alt={user?.getUser?.name as string}
          width={500}
          height={500}
          className="w-20 rounded-full"
        />
        <div className="mt-2 text-center">
          <h1 className="font-bold">@{user?.getUser?.profile_title}</h1>
          <h1 className="text-sm">{user?.getUser?.bio}</h1>
        </div>

        <div className="mt-4 w-full max-w-xs space-y-4">
          {links.map((link) => (
            <div
              className="shadowed-button relative flex h-14 w-full items-center justify-center rounded-full border border-black bg-white"
              key={link.id}
            >
              <p className="text-black">{link.title}</p>

              {link.show_icon ? (
                link.uploaded_icon ? (
                  <div className="absolute left-2 h-[40px] w-[40px] rounded-full bg-black">
                    <Image
                      src={link.uploaded_icon as string}
                      alt="Icon"
                      width={200}
                      height={200}
                      className="h-full w-full"
                    />
                  </div>
                ) : (
                  <div className="absolute left-2">
                    <SocialIcon
                      url={link.url}
                      className=""
                      as="div"
                      style={{ width: 40, height: 40 }}
                    />
                  </div>
                )
              ) : null}
            </div>
          ))}
        </div>

        <p className="left-0 right-0 mx-auto mt-10 w-fit text-sm font-bold uppercase">
          Join Treelink
        </p>
      </div>
    </>
  );
};

const PreviewSkeleton = () => {
  return (
    <>
      <div className="relative z-10 flex w-full flex-col items-center">
        <Skeleton className="h-20 w-20 rounded-full bg-white" />
        <div className="mt-2 text-center">
          <Skeleton className="h-6 w-44 bg-white" />
        </div>

        <div className="mt-4 w-full max-w-xs space-y-4">
          {[...new Array(3)].map((_, index) => (
            <Skeleton
              className="shadowed-button relative flex h-14 w-full items-center justify-center rounded-full border border-black bg-white"
              key={index}
            ></Skeleton>
          ))}
        </div>

        <p className="left-0 right-0 mx-auto mt-10 w-fit text-sm font-bold uppercase">
          Join Treelink
        </p>
      </div>
    </>
  );
};

export default AdminDashboard;
