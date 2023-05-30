import dbClient from './utils/db';
(async () => {
  const user = await dbClient.findUser({email: 'test@gmail.com'});
  if (user)
	  console.log(user);
  else
    console.log('not found', user);
})();
