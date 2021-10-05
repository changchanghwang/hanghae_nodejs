const fn = {
    add: (num1, num2) => num1 + num2,
    makeUser: (name, age) => ({ name, age, gender: undefined }),
    throwErr: () => {
        throw new Error('xx');
    },
    getName:(callback)=>{
        const name='mike';
        setTimeout(()=>{
            callback(name);
        },3000)
    }
};

module.exports = fn;
