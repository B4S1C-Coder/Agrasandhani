import getToken, {getUserInfo, updateUserInfo, logout} from "./sdk.mjs";

// Use Promise way
// getToken(
//     {
//         username: "testuser",
//         password: "test123",
//     }
// ).then(token => console.log(token));


// Use Async way
(async () => {
    // Return access token and logs in
    const tok = await getToken(
        {
            username: "testuser",
            password: "test123",
        }
    );

    // Get information associated with the currently logged in user
    const userInfo = await getUserInfo(tok);

    console.log("Before Update\n==========");
    console.log(userInfo);

    // Update the currently logged in user's information
    await updateUserInfo(tok, {"phone_no":"+91-9012345678"});
    const updatedInfo = await getUserInfo(tok);

    console.log("After Update\n==========");
    console.log(updatedInfo);

    // To logout currently logged in user
    await logout(tok);
})();