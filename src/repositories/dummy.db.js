module.exports.createDummyData = async (models) => {

    const User = models.user;

    const arr = [];
    for (let i = 0; i < 10; i++) {
        const user = {
            first_name: 'first name test' + i,
            last_name: 'last name test' + i,
            email: 'mail@' + i + '.com',
            password: `pa$$${i}${i}${i}${i}`,
            role: (i%2 == 0 ? 'ADMIN' : 'USER')
        }
        arr.push(User.create(user));
    }
    
    try {
        const responses = await Promise.all(arr);
        console.log(`${responses.length} Users created successfully`);
    } catch (e) {
        console.log('Something went wrong',e);
    }
}



