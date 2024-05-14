import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

import Front from '../component/Front';

// Jestによる外部モジュールのモック化
import { existFav } from '../util/handleData';
jest.mock('../util/handleData');

import movieTrailer from 'movie-trailer';
jest.mock('movie-trailer');

describe('Unit Test for Front', () => {

  it('check how useEffect is going', async () => {
    render(<Front />);

    // モック化したexistFav()に返り値を設定
    existFav.mockImplementation(() => true);

    // jsdomではfetchData()を超えられないため、その後実行されるexistFav()は呼び出されない
    expect(existFav).not.toHaveBeenCalled();
  });

  it('check how watch button works', async () => {
    render(<Front />);

    // モック化したmovieTrailer()に返り値を設定
    movieTrailer.mockImplementation(() => Promise.resolve());

    // レンダリング直後のtrailerUrlがない初期状態で視聴ボタンを押すとmovieTrailerが走りる
    expect(await screen.findByRole('button', { name: /視聴/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', {name: /視聴/i}));
    expect(movieTrailer).toHaveBeenCalled();
  });

});
