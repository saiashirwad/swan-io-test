import { createRouter, Link, useLocation } from '@swan-io/chicane';
import { FC } from 'react';
import { match } from 'ts-pattern';

const auth = true;

const getKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>;

const routes = {
  Home: '/',
  UserList: '/users?:sortBy&:status[]',
  User: '/users/:userId',
  Users: 'users',
} as const;

const keys = getKeys(routes);
const Router = createRouter(routes);

function App() {
  const route = Router.useRoute(keys);

  return (
    <div>
      {match(route)
        .with({ name: 'Home' }, () => <Home />)
        .with({ name: 'Users' }, () => <Users />)
        .with({ name: 'UserList' }, ({ key, params: { sortBy, status } }) => (
          <UserList sortBy={sortBy} status={status} />
        ))
        .with({ name: 'User' }, ({ params }) => <User id={params.userId} />)
        .otherwise(() => (
          <></>
        ))}
    </div>
  );
}

const Home = () => {
  return (
    <div>
      Home
      <div>
        <button
          onClick={() => {
            Router.push('User', { userId: 'sai' });
          }}
        >
          Go to lol
        </button>
        <Link to={Router.User({ userId: '1' })}>Go to user 1</Link>
        <br />
        <Link to={Router.User({ userId: '2' })}>Go to user 2</Link>
        <br />
        <Link to={Router.UserList({ sortBy: 'a', status: ['sai'] })}>
          Userlist
        </Link>
      </div>
    </div>
  );
};

type IUserlist = NonNullable<Parameters<typeof Router.UserList>[0]>;

const User: FC<{ id: string }> = ({ id }) => {
  return <>User {id}</>;
};

const Users = () => {
  return <>What</>;
};

const UserList: FC<IUserlist> = ({ sortBy, status }) => {
  return <>hi {JSON.stringify({ sortBy, status })}</>;
};

export default App;
