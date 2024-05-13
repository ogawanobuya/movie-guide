import { render, screen, act } from '@testing-library/react';

import App from '../App';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '../context/AuthContext';

describe('Unit Test for App', () => {

  test('check access route regarding Main Page', async () => {
    const renderResult = render(
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
    renderResult.debug();
    // その後、useEffect内のstateが更新されることで再レンダリングが起こりAppページが表示される
    expect(await renderResult.findByRole('heading', {name: /Movie Guideへようこそ/i})).toBeInTheDocument();
    renderResult.debug();
  });

});
