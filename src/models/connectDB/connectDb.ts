import mongoose  from "mongoose";
import { topicModel } from "../model/topic.model";
import { tagModel } from "../model/tag.model";
import { authorModel } from "../model/author.model";
import { postModel } from "../model/posts.model";


export const createIndexTopic = async () => {
  try {
    const checkIndexExists = await topicModel.collection.indexExists(['topic_text']);
    if (!checkIndexExists) {
      await topicModel.collection.createIndex(
        { "topic": "text" },
        { default_language: "none" }
      );
      console.log("Chỉ số đã được tạo thành công.");
    } else {
      console.log("Chỉ số đã tồn tại.");
    }
  } catch (error) {
    console.error("Lỗi khi tạo chỉ số:", error);
  }
}
export const createIndexPost = async () => {
  try {
    const checkIndexExists = await postModel.collection.indexExists(['post_text']);
    if (!checkIndexExists) {
      await postModel.collection.createIndex(
        { "post": "text" },
        { default_language: "none" }

      );
      console.log("Chỉ số đã được tạo thành công.");
    } else {
      console.log("Chỉ số đã tồn tại.");
    }
  } catch (error) {
    console.error("Lỗi khi tạo chỉ số:", error);
  }
}

export const createIndexTag = async () => {
  try {
    const checkIndexExists = await tagModel.collection.indexExists(['tag_text']);
    if (!checkIndexExists) {
      await tagModel.collection.createIndex({ "tag": "text" },
        { default_language: "none" })
    }
  } catch (error) {
    console.error("Lỗi khi tạo chỉ số:", error);
  }
}
export const createIndexAuthor = async () => {
  try {
    const checkIndexExists = await authorModel.collection.indexExists(['author_text']);
    if (!checkIndexExists) {
      await authorModel.collection.createIndex({ "author": "text" },
        { default_language: "none" })
    }
  } catch (error) {
    console.error("Lỗi khi tạo chỉ số:", error);
  }
}

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/intern_project')
    console.log("connect successfully")
  }
  catch (error) {
    console.log(error)
  }
}