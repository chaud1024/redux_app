import React from 'react'
import { useSelector } from "react-redux";
import { selectAllPosts } from './postsSlice';
import PostAuthor from './PostAuthor';

const PostsList = () => {
    
    // state구조가 바뀔 경우를 대비하자
    // useSelector(state => state.posts)에서 state.posts.post.comment 등등 내부 구조가 복잡해진다면
    // selector를 slice안에서 만들고 export하는 게 좋음
    const posts = useSelector(selectAllPosts)
    // 이렇게 함으로써 state의 구조가 바뀌더라도 그 변경사항을 slice에서 바꿔주기만하면 됨,
    //모든 컴포넌트에 들어가서 변경하지 않아도 됨

    const renderedPosts = posts.map((post) => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <p className='postCredit'>
              <PostAuthor userId={post.userId} />
            </p>
        </article>
    ))

  return (
    <section>
        <h2>Posts</h2>
        {renderedPosts}
    </section>
  )
}

export default PostsList