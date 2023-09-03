import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

// Db de yeni bir kullanıcı ekler.
export const addUserToDatabase = async (user) => {
  try {
    const response = await api.post("/users", user);
  } catch (error) {
    console.log("Database de kullanıcı oluşturulurken bir hata oluştu:", error);
  }
};

// Db de Users'ları geri döndürür.
export const getUsersFromDatabase = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    console.error("Kullanıcıları alırken bir hata oluştu:", error);
  }
};

// Kullanıcıları veritabanına yazmak için bir işlev
export const updateUserToDatabase = async (userID, updateUser) => {
  debugger;
  try {
    await api.put(`/users/${userID}`, updateUser); // Veritabanına güncellenmiş kullanıcıları yazın
  } catch (error) {
    console.error("Kullanıcı güncellenirken hata oluştu: ", error);
  }
};
