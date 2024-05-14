import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

import SignIn from '../component/SignIn';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '../context/AuthContext';
import { Routing } from "../routing";

import { signInWithEmailAndPassword } from 'firebase/auth';
// 'firebase/auth'全体にモックをかけるとAuthProviderが働かなくなるため、一部だけにモック適用を絞る
jest.mock('firebase/auth', () => ({
  ...jest.requireActual('firebase/auth'),
  // ここでは関数設定だけ行い、返り値設定はテストの中で行う
  signInWithEmailAndPassword: jest.fn()
}));

describe('Unit Test for SignIn', () => {

  it('check redirect to SignIn page for non-login user', async () => {
    render(
      <HelmetProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routing />
          </BrowserRouter>
        </AuthProvider>
      </HelmetProvider>
    );
    // 非ログインユーザーはRoutingのリダイレクトによりSignInページに飛ばされる
    expect(await screen.findByRole('heading', { name: 'ログインしてMovie Guideにアクセス' })).toBeInTheDocument();
  });

  it('check action of form input and submit', async () => {
    render(
      <HelmetProvider>
        <AuthProvider>
          <BrowserRouter>
            <SignIn />
          </BrowserRouter>
        </AuthProvider>
      </HelmetProvider>
    );
    // モック化した関数の返り値を設定(元が非同期処理であるため返り値も同様にする)
    signInWithEmailAndPassword.mockImplementation(() => Promise.resolve());

    // emailフォームの挙動確認
    const emailInput = await screen.findByPlaceholderText('hoge@gmail.com');
    userEvent.type(emailInput, "test@mere.com");
    expect(emailInput.value).toBe("test@mere.com");

    // passwordフォームが入力されていない時のログインボタンの挙動確認
    fireEvent.click(screen.getByRole('button', {name: /ログイン/i}));
    expect(signInWithEmailAndPassword).not.toHaveBeenCalled();

    // passwordフォームの挙動確認
    const passwordInput = await screen.findByPlaceholderText('******');
    userEvent.type(passwordInput, "123456");
    expect(passwordInput.value).toBe("123456");

    // ログインボタンの挙動確認
    fireEvent.click(screen.getByRole('button', {name: /ログイン/i}));
    expect(signInWithEmailAndPassword).toHaveBeenCalled();
  });

});
