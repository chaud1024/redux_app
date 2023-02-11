import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { selectAllPosts } from '../posts/postsSlice'
import { selectUserByID } from './usersSlice'

const UserPage = () => {
    
    const { userId } = useParams()
    // we're going to get that userId out of the url, we call useParams
    // that will be a string as it comes from the url

    const user = useSelector(state => selectUserByID(state, Number(userId)))
    // userId를 Number로 감싸기
    // useSelector(state를 받고 => state와 userId를 받는 selectUserByID 사용)해서 user 정의

    const postsForUser = useSelector(state => {
        const allPosts = selectAllPosts(state)
        // selectAllPosts로 allposts 정의
        return allPosts.filter(post => post.userId === Number(userId))
        // allPosts를 필터(포스트가 => post.userId === useParams로 불러온 그 userId와 동일하면)그 포스트의 list만 return
    })

    const postTitles = postsForUser.map((post) => (
        <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ))

  return (
    <section>
        <h2>{user?.name}</h2>
        <ol>{postTitles}</ol>
    </section>
  )
}

export default UserPage