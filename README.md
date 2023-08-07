# @react-native-ui-components/menu

Use native context menu functionality from React Native. On iOS 13+ this uses
`UIMenu` functionality, and on Android it uses a `PopUpMenu`.

On iOS 12 and below, nothing happens. You may wish to do a
`Platform.OS === 'ios' && parseInt(Platform.Version, 10) <= 12` check, and add
your own `onLongPress` handler.

## Installation

```sh
npm install @react-native-ui-components/menu
```

or

```sh
yarn add @react-native-ui-components/menu
```

then

```
cd ios
pod install
```

## Usage

```js
import {Menu, ContextMenu} from "@react-native-ui-components/menu";

// ...

<Menu actions={[
	{title: "Title 1"},
	{title: "Title 2"}
]}>
	<View style={styles.yourOwnStyles} />
</Menu>

<ContextMenu actions={[
	{title: "Title 1"},
	{title: "Title 2"}
]}>
	<View style={styles.yourOwnStyles} />
</ContextMenu>;
```

## Props

###### `title`

Optional. The title above the popup menu.

###### `actions`

Array of
`{ title: string, subtitle?: string, systemIcon?: string, destructive?: boolean, selected?: boolean, disabled?: boolean, disabled?: boolean, inlineChildren?: boolean, actions?: Array<ContextMenuAction> }`.

Subtitle is only available on iOS 15+.

System icon refers to an icon name within
[SF Symbols](https://developer.apple.com/design/human-interface-guidelines/sf-symbols/overview/).

Destructive items are rendered in red on iOS, and unchanged on Android.

Selected items have a checkmark next to them on iOS, and unchanged on Android.

Nested menus are supported on iOS only and result in nested UIMenu which can
be optionally displayed inline.

###### `onPress`

Optional. When the popup is opened and the user picks an option. Called with
`{ nativeEvent: { index, indexPath, name } }`. When a nested action is
selected the top level parent index is used for the callback.

iOS only: to get the full path to the item, `indexPath` is an array of indices
to reach the item. For a top-levle item, it'll be an array with a single
index. For an item one deep, it'll be an array with two indicies.

###### `onCancel`

Optional. When the popop is opened and the user cancels.

###### `previewBackgroundColor`

Optional. The background color of the preview. This is displayed underneath
your view. Set this to transparent (or another color) if the default causes
issues.

###### `disabled`

Optional. Currently iOS only. Disable menu interaction.

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to
the repository and the development workflow.

## License

MIT

---

Made with
[create-react-native-library](https://github.com/callstack/react-native-builder-bob)
