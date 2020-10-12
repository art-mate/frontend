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

# 🗣 Communication

위 과정을 하면서 생기는 이슈(에러)나 코드 작성을 하면서 생기는 이슈는 [issue](https://github.com/art-mate/frontend/issues)에서 new issue를 통해 대화하면 좋을 것 같습니다!
