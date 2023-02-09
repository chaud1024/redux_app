import { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
// nanoid 는 random id 생성을 도와줍니다
import { postAdded } from "./postsSlice";

const AddPostForm = () => {
    const dispatch = useDispatch()

    // 전역이 아니라, 이 컴포넌트에서만 쓰는 것이기 때문에 useState사용
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)

    const onSavePostClidked = () => {
        if(title && content) {
            dispatch(
                postAdded({
                    id: nanoid(),
                    title,
                    content
                })
            )

            setTitle('')
            setContent('')
        }
    }

  return (
    <section>
        <h2>Add a New Post</h2>
        <form>
            <label htmlFor="postTitle">Post Title:</label>
            <input
                type="text"
                id="postTitle"
                name="postTitle"
                value={title}
                onChange={onTitleChanged}
            />

            <label htmlFor="postContent">Content:</label>
            <textarea
                id="postContent"
                name="postContent"
                value={content}
                onChange={onContentChanged}
            />
        </form>
        <button
            type="button"
            onClick={onSavePostClidked}
        >
            Save Post
        </button>
    </section>
  )
}

export default AddPostForm