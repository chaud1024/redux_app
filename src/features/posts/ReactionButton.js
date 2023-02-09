import { useDispatch } from "react-redux";
import { reactionAdded } from "./postsSlice";

const reactionEmoji = {
    thumpup: "👍",
    wow: "😯",
    heart: "❤️",
    rocket: "🚀",
    coffee: "☕",
}


const ReactionButton = ({ post }) => {
    const dispatch = useDispatch()

    // Object.entries(reactEmoji)로 만듦으로써 map사용이 가능
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type="button"
                className="reactionButton"
                onClick={() => dispatch(reactionAdded({postId: post.id, reaction: name}))}
            >
                {emoji} {post.reactions[name]}
            </button>
        )
    })

  return (
    <div>{reactionButtons}</div>
  )
}

export default ReactionButton