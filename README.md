`$yarn add node-sass`
`$yarn add classnames`
`$yarn add react-icons`

### classnames는 왜 사용했나

classnames는 조건부 스타일링을 편하게 해주는 라이브러리입니다.
classnames의 사용방법을 설명하기 위해 아래와 같이 결과를 주석으로 달아보았습니다.

```javascript
import classNames from 'classnames';

classNames('one', 'two'); //'one two'
classNames('one', { two: true }); //'one two'
classNames('one', { two: false }); //'one'
classNames('one', ['two', 'three']); //'one two three'

const myClass = 'hello';
classNames('one', myClass, { myCondition: true }); //'one hello myCondition'
```

### prettier 설정

#### project

```
|--project
 +|--.prettierrc
```

### .prettierrc

```
{
    "singleQuote": true,
    "semi": true,
    "useTabs": false,
    "tabWidth": 2,
    "trailingComma": "all",
    "printWidth": 80
}
```
