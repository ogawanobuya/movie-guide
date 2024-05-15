import { render, screen, act, fireEvent } from '@testing-library/react';

import App from '../App';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '../context/AuthContext';

// Jestによる外部モジュールのモック化
import { logOut } from '../util/auth';
jest.mock('../util/auth');

describe('Unit Test for App', () => {

  it('check access route regarding Main Page', async () => {
    render(
      <HelmetProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </HelmetProvider>
    );
    // App(Main)ページにアクセスするとAuthContextが作動し、まずLoadingコンポーネントに送られる
    expect(screen.queryByRole('heading', {name: /ログイン情報読み込み中/i})).toBeInTheDocument();
    // その後、useEffect内のstateが更新されることで再レンダリングが起こりAppページが表示される
    expect(await screen.findByRole('heading', {name: /Movie Guideへようこそ/i})).toBeInTheDocument();
  });

  it('check if logOut func is working when putting button', async () => {
    // モック化したlogOut()に返り値を設定
    logOut.mockImplementation(() => true);
    render(
      <HelmetProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </HelmetProvider>
    );

    expect(await screen.findByRole('button', {name: /ログアウト/i})).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', {name: /ログアウト/i}));
    expect(logOut).toHaveBeenCalled();
  });

  it('check if fav link is working properly', async () => {
    render(
      <HelmetProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </HelmetProvider>
    );
    // Jestはjsdomを使って模擬ブラウザ上でテストを実行しているため、実際のような画面遷移が行えないのでリンクテストは以下のようになる(https://stackoverflow.com/questions/57827126/how-to-test-anchors-href-with-react-testing-library)
    expect(await screen.findByRole('link', { name: 'お気に入りリスト' })).toHaveAttribute('href', '/favorite')
  });

});
