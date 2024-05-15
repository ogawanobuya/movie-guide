import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

import Front from '../component/Front';

// Jestによる外部モジュールのモック化
import api from '../util/movieApi';

import { existFav } from '../util/handleData';
jest.mock('../util/handleData');

import movieTrailer from 'movie-trailer';
jest.mock('movie-trailer');

describe('Unit Test for Front', () => {
  afterEach(() => {
    // モック化した全ての関数を元に戻す、これがなければ「../util/movieApi」がモックされたままになり二つ目のテストのrenderで問題が生じる
    jest.restoreAllMocks();
  });

  it('check how useEffect is going', async () => {
    // 時折「typeerror: cannot read properties of undefined (reading 'data')」というエラーが出るのは「mock->render->return value set」の順でやってるため、render時にモック関数の返り値がない
    // spyOnにすることでtest関数内部でモックを行い「../util/movieApi」のモック化範囲を絞る。なお、spyOn(オブジェクト, 関数)のため、あくまで関数をモックする役割
    jest.spyOn(api, "get").mockResolvedValue({ data: {results: "hoge"} });
    existFav.mockImplementation(() => true);
    render(<Front />);

    expect(api.get).toHaveBeenCalled();
    // Frontコンポーネントでapi.get()が叩かれるが、非同期処理のため、existFav()が叩かれる前にこちらのテストが回る
    // そのため、waitFor()によりFrontコンポーネント内の処理終了を待つ
    await waitFor(() => {
      expect(existFav).toHaveBeenCalled();
    });
  });

  it('check how watch button works', async () => {
    movieTrailer.mockImplementation(() => Promise.resolve());
    render(<Front />);

    // レンダリング直後のtrailerUrlがない初期状態で視聴ボタンを押すとmovieTrailerが走りる
    expect(await screen.findByRole('button', { name: /視聴/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', {name: /視聴/i}));
    expect(movieTrailer).toHaveBeenCalled();
  });

});
