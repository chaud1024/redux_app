import { useSelector } from 'react-redux'
import { selectAllUsers } from './usersSlice'
import { Link } from 'react-router-dom'

const UsersList = () => {

    const users = useSelector(selectAllUsers)
    // selectAllUsers를 통해 users 정의

    const renderedUsers = users.map((user) => (
        <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
        </li>
    ))
    // renderedUsers = 유저 정보 array
    // 각 user는 각자의 user page를 가진다
  return (
    <section>
        <h2>Users</h2>
        <ul>{renderedUsers}</ul>
    </section>
  )
}

export default UsersList