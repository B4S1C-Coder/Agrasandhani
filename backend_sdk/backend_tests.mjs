import getToken, {getUserInfo, updateUserInfo, logout, createUser} from "./sdk.mjs";

// Use Promise way
// getToken(
//     {
//         username: "testuser",
//         password: "test123",
//     }
// ).then(token => console.log(token));


// Use Async way
(async () => {

    // Create new user
    const userCreds = await createUser({
        username: "testusersdk",
        password: "sdk123",
        email: "testsdk@email.com", // Dummy email for TESTING ONLY
    });

    console.log(userCreds);

    // Return access token and logs in
    const tok = await getToken(
        {
            username: "testusersdk",
            password: "sdk123",
        }
    );

    // Get information associated with the currently logged in user
    const userInfo = await getUserInfo(tok);

    console.log("Before Update\n==========");
    console.log(userInfo);

    // Update the currently logged in user's information
    const updatedInfo = await updateUserInfo(tok, {
        "phone_number":"+91-4216645698",
        "bio": "Bio has been updated! ROFLMAO!"
    });

    console.log("After Update\n==========");
    console.log(updatedInfo);

    // To logout currently logged in user
    await logout(tok);
})();

// OUTPUT after running above

/*
{ id: 3, username: 'testusersdk', email: 'testsdk@email.com' }
Before Update
==========
{
  id: 2,
  userid: 3,
  user: 'testusersdk',
  email: 'testsdk@email.com',
  bio: "Hey there! I'm using Agrasandhani.",
  phone_number: ''
}
After Update
==========
{
  id: 2,
  userid: 3,
  user: 'testusersdk',
  email: 'testsdk@email.com',
  bio: 'Bio has been updated! ROFLMAO!',
  phone_number: '+91-4216645698'
}

*/