const BASE_URL_Register = "http://localhost:8080/api/auth/register";
const BASE_URL = "http://localhost:8080/api/auth/login";


/**
 * Fetch ile kullanıcı oluşturur
 * @param {Object} userData - Kullanıcı bilgileri
 * @param {string|null} token - JWT token (opsiyonel)
 * @returns {Promise<Object>} - Oluşan kullanıcı verisi
 */
export const createUser = async (userData) => {
  console.log(userData)
    //const token = localStorage.getItem("tokenKey");
    //const userName = localStorage.getItem("userName");
  try {
    const headers = {
      "Content-Type": "application/json"
    };

    /*if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }*/
    const response = await fetch(BASE_URL_Register, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error(`Sunucu hatasi: ${response.status}`);
    }

    const data = await response.json();
    return data;

    
  } catch (error) {
    console.error("createUser (fetch) error:", error);
    throw error;
  }
};

/**
 * Kullanıcı siler (DELETE)
 */
export const deleteUser = async (userId) => {
  try {
    const token = localStorage.getItem("tokenKey");
    console.log(token);
    console.log(userId);
    const response = await fetch(`http://localhost:8080/api/user/${userId}`, {
      method: "DELETE",
      headers: {
        "Authorization": `${token}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Silme hatasi: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("deleteUser error:", error);
    throw error;
  }
};