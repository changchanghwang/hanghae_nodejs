const { idAuth, pwAuth } = require('./signupValidation');

test('아이디는 영어 대소문자, 숫자만 가능하고 3글자 이상이어야한다.성공', () => {
    expect(idAuth('aA1')).toEqual(true);
    expect(idAuth('aaaa')).toEqual(true);
    expect(idAuth('AAAAA')).toEqual(true);
    expect(idAuth('111111')).toEqual(true);
});

test('비밀번호는 영어 대소문자,숫자만 가능하고 4글자 이상이며 비밀번호 재확인 값과 일치하고 아이디가 포함되지 않은 값이어야 한다.', () => {
    expect(pwAuth('aA1', 'bB2b', 'bB2b')).toEqual(true);
    expect(pwAuth('aA1', 'bbbb', 'bbbb')).toEqual(true);
    expect(pwAuth('aA1', 'BBBB', 'BBBB')).toEqual(true);
    expect(pwAuth('aA1', '2222', '2222')).toEqual(true);
});

test('아이디는 영어 대소문자,숫자만 가능하고 3글자 이상이어야한다.실패', () => {
    expect(idAuth('')).toEqual(false);
    expect(idAuth('a')).toEqual(false);
    expect(idAuth('A')).toEqual(false);
    expect(idAuth('1')).toEqual(false);
    expect(idAuth('aA')).toEqual(false);
    expect(idAuth('a1')).toEqual(false);
    expect(idAuth('A1')).toEqual(false);
    expect(idAuth('!aA1!')).toEqual(false);
    expect(idAuth('aㅁa')).toEqual(false);
    expect(idAuth('ㅁㅁㅁ')).toEqual(false);
});

test('비밀번호는 영어 대소문자,숫자만 가능하고 4글자 이상이어야 한다.', () => {
    expect(pwAuth('aA1', '', '')).toEqual(false);
    expect(pwAuth('aA1', 'b', 'b')).toEqual(false);
    expect(pwAuth('aA1', '2', '2')).toEqual(false);
    expect(pwAuth('aA1', 'B', 'B')).toEqual(false);
    expect(pwAuth('aA1', 'b2', 'b2')).toEqual(false);
    expect(pwAuth('aA1', '2B', '2B')).toEqual(false);
    expect(pwAuth('aA1', 'bB', 'bB')).toEqual(false);
    expect(pwAuth('aA1', 'bB2', 'bB2')).toEqual(false);
    expect(pwAuth('aA1', 'bB2 ', 'bB2 ')).toEqual(false);
    expect(pwAuth('aA1', 'bB2@', 'bB2@')).toEqual(false);
    expect(pwAuth('aA1', 'ㅁㄴㅇㄹ', 'ㅁㄴㅇㄹ')).toEqual(false);
});

test('비밀번호는 비밀번호재확인 값과 일치하여야 한다.', () => {
    expect(pwAuth('aA1', 'bB2b', 'bB2bb')).toEqual(false);
    expect(pwAuth('aA1', 'bB2b', 'cC3c')).toEqual(false);
});

test('비밀번호는 아이디가 포함되지 않은 값이어야 한다.', () => {
    expect(pwAuth('aA1a', 'aA1a', 'aA1a')).toEqual(false);
});
