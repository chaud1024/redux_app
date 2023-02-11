import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectPostById, updatePost } from './postsSlice'
import { useParams, useNavigate } from 'react-router-dom'

import { selectAllUsers } from '../users/usersSlice'

const EditPostForm = () => {
    const { postId } = useParams()
    const navigate = useNavigate()

    const post = useSelector((state) => selectPostById(state, Number(postId)))
    const users = useSelector(selectAllUsers)

    const [ title, setTitle ] = useState(post?.title)
    const [ content, setContent ] = useState(post?.content)
    const [ userId, setUserId ] = useState(post?.userId)
    const [ requestStatus, setRequestStatus ] = useState('idle')

    const dispatch = useDispatch()

    if (!post) {
        return (
            <section>
                <h2>Post not found!</h2>
            </section>
        )
    }

    const onTitleChanged = (e) => setTitle(e.target.value)
    const onContentChanged = (e) => setContent(e.target.value)
    const onAuthorChanged = (e) => setUserId(e.target.value)

    const canSave = [title, content, userId].every(Boolean) && requestStatus == 'idle'

    const onSavePostClicked = () => {
        if(canSave) {
            try {
                setRequestStatus('pending')
                dispatch(updatePost({id: post.id, title, body: content, userId, reactions: post.reactions})).unwrap()
                // dispatch 실행 시 updatePost Thunk를 호출
                // passing in all the information we need
                // 날짜는 보내지 않음: 업데이트한 날짜 보낼것이므로

                setTitle('')
                setContent('')
                setUserId('')
                navigate(`/post/${postId}`)
            } catch(err) {
                console.error('Failed to save the post', err)
            } finally {
                setRequestStatus('idle')
            }
        }
    }

    const usersOptions = users.map(user => (
        <option
            key={user.id}
            value={user.id}
        >
            {user.name}
        </option>
    ))

  return (
    <section>
        <h2>Edit Post</h2>
        <form>
            <label htmlFor='postTitme'>Post Title: </label>
            <input
                type="text"
                id="postTitle"
                name="postTitle"
                value={title}
                onChange={onTitleChanged}
            />

            <label htmlFor='postAuthor'>Author: </label>
            <select id="postAuthor" defaultValue={userId} onChange={onAuthorChanged}>
                <option value=""></option>
                {usersOptions}
            </select>

            <label htmlFor='postContent'>Content: </label>
            <textarea
                id="postContent"
                name="postContent"
                value={content}
                onChange={onContentChanged}
            />

            <button
                type="button"
                onClick={onSavePostClicked}
                disabled={!canSave}
            >
                Save Post
            </button>
        </form>
    </section>
  )
}

export default EditPostForm 