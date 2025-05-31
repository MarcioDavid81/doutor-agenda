const uploadAvatarToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  
  const response = await fetch("/api/doctors/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Erro ao fazer upload da imagem");
  }

  const data = await response.json();
  return data.url;
};

export default uploadAvatarToCloudinary;