export const image_url = (file_name) => {
  return `${process.env.REACT_APP_IMAGES_ENDPOINT}${file_name}`;
};

export const get_gallery_image_urls = (filenames) => {
  return filenames
    ?.split(",")
    ?.filter((item) => item !== "")
    ?.map((name) => image_url(name));
};
