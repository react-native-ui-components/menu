import {type ReactNode} from "react";
import {
	requireNativeComponent,
	UIManager,
	Platform,
	type ViewStyle,
	type ViewProps,
	type NativeSyntheticEvent,
	StyleSheet,
	View
} from "react-native";

const LINKING_ERROR =
	`The package '@react-native-ui-components/menu' doesn't seem to be linked. Make sure: \n\n` +
	Platform.select({ios: "- You have run 'pod install'\n", default: ""}) +
	"- You rebuilt the app after installing the package\n" +
	"- You are not using Expo Go\n";

// type MenuProps = {
//   color: string;
//   style: ViewStyle;
// };

const ComponentName = "ContextMenu";

//export const Menu =
const NativeMenu =
	UIManager.getViewManagerConfig(ComponentName) != null
		? requireNativeComponent<
				MenuProps & {
					dropdownMenuMode: boolean;
					onPress: (
						e: NativeSyntheticEvent<ContextMenuOnPressNativeEvent>
					) => void;
				}
		  >(ComponentName)
		: () => {
				throw new Error(LINKING_ERROR);
		  };

//todo just export above

const styles = StyleSheet.create({
	preview: {
		position: "absolute",
		overflow: "visible",
		backgroundColor: "transparent"
	}
});

export interface ContextMenuAction {
	/**
	 * The title of the action
	 */
	title: string;
	/**
	 * The subtitle of the action. iOS 15+.
	 */
	subtitle?: string;
	/**
	 * The icon to use on ios. This is the name of the SFSymbols icon to use. On Android nothing will happen if you set this option.
	 */
	systemIcon?: string;
	/**
	 * Destructive items are rendered in red on iOS, and unchanged on Android. (default: false)
	 */
	destructive?: boolean;
	/**
	 * Selected items have a checkmark next to them on iOS, and unchanged on Android. (default: false)
	 */
	selected?: boolean;
	/**
	 * Whether the action is disabled or not (default: false)
	 */
	disabled?: boolean;
	/**
	 * Whether its children (if any) should be rendered inline instead of in their own child menu (default: false, iOS only)
	 */
	inlineChildren?: boolean;
	/**
	 * Child actions. When child actions are supplied, the childs callback will contain its name but the same index as the topmost parent menu/action index. (iOS Only)
	 */
	actions?: Array<ContextMenuAction>;
	//
	onPress?: () => void;
}

interface ContextMenuOnPressNativeEvent {
	index: number;
	indexPath: number[];
	name: string;
}

export interface MenuProps extends ViewProps {
	/**
	 * The title of the menu
	 */
	title?: string;
	/**
	 * The actions to show the user when the menu is activated
	 */
	actions?: ContextMenuAction[];
	/**
	 * Handle when the menu is cancelled and closed
	 */
	onCancel?: () => void;
	/**
	 * The background color of the preview. This is displayed underneath your view. Set this to transparent (or another color) if the default causes issues.
	 */
	previewBackgroundColor?: ViewStyle["backgroundColor"];
	/**
	 * Custom preview component.
	 */
	preview?: ReactNode;
	/**
	 * When enabled, uses iOS 14 menu mode, and shows the context menu on a single tap with no zoomed preview.
	 */
	dropdownMenuMode?: boolean;
	/**
	 * Currently iOS only. Disable menu interaction
	 */
	disabled?: boolean;
	/**
	 * Children prop as per upgrade docs: https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-typescript-definitions
	 */
	children?: ReactNode;
}

interface ContextMenuOnPressNativeEvent {
	index: number;
	indexPath: number[];
	name: string;
}

const getAction = (
	[a, ...b]: number[],
	actions: ContextMenuAction[]
): ContextMenuAction | undefined => {
	if (typeof a === "number") {
		if (!b.length) return actions[a];
		else return getAction(b, actions[a]?.actions as ContextMenuAction[]);
	}
	return undefined;
};

const Base = (props: MenuProps & {longPress: boolean}) => {
	const {actions, longPress} = props;

	return (
		<NativeMenu
			{...props}
			dropdownMenuMode={!longPress}
			onPress={(
				e: NativeSyntheticEvent<ContextMenuOnPressNativeEvent>
			) => {
				if (actions) {
					const action =
						Platform.OS == "ios"
							? getAction(e.nativeEvent.indexPath, actions)
							: actions[e.nativeEvent.index];

					action?.onPress?.();
				}
			}}
		>
			{props.children}
			{props.preview != null && Platform.OS === "ios" ? (
				<View style={styles.preview} nativeID="ContextMenuPreview">
					{props.preview}
				</View>
			) : null}
		</NativeMenu>
	);
};

export const Menu = (props: MenuProps) => (
	<Base {...props} longPress={false}>
		{props.children}
	</Base>
);
export const ContextMenu = (props: MenuProps) => (
	<Base {...props} longPress={true}>
		{props.children}
	</Base>
);
