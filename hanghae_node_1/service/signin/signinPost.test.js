jest.mock('../../models/user')  
const {signinPost} = require('./signinPost');
const User = require('../../models/user')

test('로그인할때 id와 pw로 찾고 있으면 token을 만들고 cookie에 담아서 response로 result:success를 보낸다.',async()=>{
    const id = 'asdf'
    const pw = 'qwer'
    const req={
        body:{
            id:id,
            pw:pw,
        },
    }
    const res={
        send:jest.fn(),
        cookie:jest.fn(),
    }
    const next = jest.fn();

    await User.findOne.mockReturnValue(
        Promise.resolve({
            id:id,
        })
    )
    await signinPost(req,res,next);
    expect(res.send).toBeCalledWith({
        result:'success',
    })
})