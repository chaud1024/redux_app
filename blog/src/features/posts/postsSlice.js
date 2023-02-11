import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {sub} from 'date-fns'

const POSTS_URL='https://jsonplaceholder.typicode.com/posts'


const initialState = {
    posts: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL)
    return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost)
    return response.data
})

export const updatePost = createAsyncThunk('posts/updatePost', async (initialPost) => {
    const { id } = initialPost;
    
    try {
        const response = await axios.put(`${POSTS_URL}/${id}`, initialPost)
        return response.data
    } catch (err) {
        return err.message
    }
})

export const deletePost = createAsyncThunk('posts/deletePost', async(initialPost) => {
    const { id } = initialPost;
    // initialPost데이터에서 id 구조분해할당해 받기
    try {
        const response = await axios.delete(`${POSTS_URL}/${id}`)
        // 어떤 포스트가 delete되는지 알기 위해 id받기
        // delete method
        if(response?.status == 200) return initialPost;
        // delete request 보내도 jsonplaceholder api는 그 삭제하고자하는 id를 보내주지않음
        // 보통은 REST api는 삭제한 그 포스트의 id를 돌려보내줌 
        // jsonplaceholder사용 예시에서 필요한 작업임
        // status 200 이면 initialPost리턴
        return `${response?.status} : ${response?.statusText}`;
        // 200이 아닌 경우 해당 메시지 보내기
    } catch (err) {
        return err.message;
    }
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer (state, action) {
                state.posts.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumpup: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0,
                        }
                    }
                }
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.posts.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Adding date and reactions
                let min = 1;
                const loadedPosts = action.payload.map((post) => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString()
                    post.reactions = {
                        thumpup: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                })
                // Add any fetched posts to the array
                state.posts = state.posts.concat(loadedPosts)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                // Fix for API post IDs:
                // Creating sortedPosts & assigning the id 
                // would be not be needed if the fake API 
                // returned accurate new post IDs
                const sortedPosts = state.posts.sort((a, b) => {
                    if (a.id > b.id) return 1
                    if (a.id < b.id) return -1
                    return 0
                })
                action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
                // End fix for fake API post IDs 

                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumpup: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                }
                console.log(action.payload)
                state.posts.push(action.payload)
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                if(!action.payload?.id) {
                    console.log('Update could not complete')
                    console.log(action.payload)
                    return
                }
                const { id } = action.payload;
                // action.payload로부터 id를 구조분해할당함
                action.payload.date = new Date().toISOString();
                // 새로운 날짜 정보를 action.payload에 세팅
                const posts = state.posts.filter(post => post.id !== id);
                // 예전 포스트들과 id를 비교해서 id가 같지 않은 것(즉 수정하지 않은 것)을 골라냄
                state.posts = [...posts, action.payload];
                // posts의 상태 업데이트 = [필터한 예전 포스트들, 업데이트 한 포스트들]
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                // id여부 체크
                if(!action.payload?.id) {
                    console.log('Delete could not complete')
                    console.log(action.payload)
                    return;
                }
                const { id } = action.payload;
                // action.payload로부터 id 구조분해할당받음
                const posts = state.posts.filter(post => post.id !== id)
                // posts필터: 삭제한 포스트의 id와 같지 않은 것
                // 즉 삭제하지 않은 포스트들 모으기
                state.posts = posts;
                // posts의 상태 업데이트 = 삭제하지 않은 포스트들
            })
    }
})

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId)

export const { postAdded, reactionAdded } = postsSlice.actions

export default postsSlice.reducer