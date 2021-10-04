const { signupPost } = require('./signupPost');

jest.mock('../models/user');



test('아이디, 비밀번호, 비밀번호 재확인을 입력하고 가입하기를 누르면 response로 result:success를 보내준다.', async () => {
    let id = 'a1A';
    let pw = 'b2B2';
    let pwCheck = 'b2B2';
    const mockedSend = jest.fn();
    const req = {
        body: {
            id: id,
            pw: pw,
            pwCheck: pwCheck,
        },
    };
    const res = {
        send: mockedSend,
    };
    const next = jest.fn();
    await signupPost(req, res, next);
    expect(mockedSend).toBeCalledWith({
        result: 'success',
    });
});

test('아이디, 비밀번호, 비밀번호 재확인을 입력하고 가입하기를 눌렀을때 이미 가입한 아이디면 response로 result:Fail을 보내주고 msg:중복되는 아이디가 있습니다. 를 보내준다', async()=>{
    let id = '1234';
    let pw = 'asdf';
    let pwCheck = 'asdf';
    const mockedSend = jest.fn();
    const req = {
        body: {
            id: id,
            pw: pw,
            pwCheck: pwCheck,
        },
    };
    const res = {
        send: mockedSend,
    };
    const next = jest.fn();
    await signupPost(req, res, next);
    expect(mockedSend).toBeCalledWith({
        result: 'Fail',
        msg: '중복되는 아이디가 있습니다.',
    });
})

test('아이디, 비밀번호, 비밀번호 재확인이 틀렸을 때:signupValidation에 위배될때 response로 result:Fail을 보내주고 msg:아이디 또는 패스워드를 확인해주세요. 를 보내준다', async () =>{
    let id = 'a1A';
    let pw = 'b2B@';
    let pwCheck = 'b2B2';
    const mockedSend = jest.fn();
    const req = {
        body: {
            id: id,
            pw: pw,
            pwCheck: pwCheck,
        },
    };
    const res = {
        send: mockedSend,
    };
    const next = jest.fn();
    await signupPost(req, res, next);
    expect(mockedSend).toBeCalledWith({
        result: 'Fail',
        msg: '아이디 또는 패스워드를 확인해주세요.',
    });
})