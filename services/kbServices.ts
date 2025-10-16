import { PrivateAxios } from "../helpers/PrivateAxios";

export const fetchKnowledgeBase = async (kbId: string) => {
  try {
    const response = await PrivateAxios.get(`/kb/${kbId}`);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch analytics data", error);
    throw error;
  }
};

export const getArticle = async (articleId: string) => {
  try {
    const response = await PrivateAxios.get(`/articles/${articleId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch analytics data", error);
    throw error;
  }
};

