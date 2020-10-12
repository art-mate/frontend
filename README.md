# 🎨 artmate

artmate frontend repository

# ✔️ Prerequisites

시작하기 전에, 저번에 npm을 설치하셨는데 속도가 좀 느린 것 같더라구요. 그래서 좀 더 빠른 yarn을 사용하는게 좋을 것 같아요. cmd 창에서 아래와 같이 하면 빠르게 설치하실 수 있습니다.

```
$ npm install -g yarn
```

```
$ yarn --version
```

# ✨ Getting Started

이전에 설명드린 방법은 fork를 통해 협업을 하는 것이였는데, 복잡하기도 하고 찾아보니까 더 간단한 방법이 있어서 다른 방법으로 진행하는게 좋을 것 같습니다! <br />
먼저 **이전에 받았던 frontend 폴더는 삭제하고** 현재 프로젝트 레포에서 똑같이 위의 Code를 누르고 url을 복사합니다. 그리고 터미널에서 다음과 같이 입력합니다.

```
$ git clone 복사한 url
```

clone이 완료 되었으면 **clone한 frontend 폴더**에서 이전에 했던대로 브랜치를 생성합니다. 저의 경우 daehoon으로 생성합니다.

```
$ git checkout -b daehoon
```

그리고 필요한 패키지를 다운받기 위해 다음과 같이 입력합니다.

```
$ yarn
```

프로젝트를 시작합니다

```
$ yarn start
```

이제 해당 브랜치에서 코드를 수정하시면 됩니다. 코드를 작성하고 나면, 다음과 같이 입력합니다.

```
$ git add .

$ git commit -m "수정 내용 한 줄로 요약"

$ git push origin daehoon
```

위의 과정까지 완료하고 다시 현재 페이지로 오면 초록색 바탕의 Compare & Pull Request 버튼이 있을 겁니다. 그걸 눌러서 Pull Request를 작성하시면 됩니다. **Pull Request를 작성하고, merge버튼을 누르면 안됩니다.**

# 🗣 Communication

위 과정을 하면서 생기는 이슈(에러)나 코드 작성을 하면서 생기는 이슈는 [issue](https://github.com/art-mate/frontend/issues)에서 new issue를 통해 대화하면 좋을 것 같습니다!

# ✨ fork

1. vscode에서 터미널(Ctrl+Shift+`)을 열고 브랜치를 master로 바꿉니다.

```
$ git checkout master
```

2. upstream(frontend)에서 master브랜치 커밋을 가져와 현재 로컬 저장소에 병합을 합니다.

```
$ git fetch upstream master
```

```
$ git rebase upstream/master
```

3. 브랜치를 다시 자신의 이름으로 변경합니다.

```
$ git checkout 이름
```

4. master 브랜치에 있는 코드를 가져옵니다.

```
$ git pull origin master
```

5. App.js 등에서 충돌이 생길 것입니다. 충돌이 난 부분(>>>> 등)에 incoming change를 눌러줍니다.
6. 패키지들을 설치합니다.

```
$ yarn
```

7. 프로젝트 시작

```
$ yarn start
```
