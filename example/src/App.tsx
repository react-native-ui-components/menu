import {useState} from "react";
import {SafeAreaView, View, StyleSheet} from "react-native";
import {ContextMenu, Menu} from "@react-native-ui-components/menu";

export default () => {
	const [color, setColor] = useState("blue");
	const [circle, setCircle] = useState(false);

	return (
		<SafeAreaView style={styles.container}>
			<ContextMenu
				title={"Customize"}
				actions={[
					{
						title: "Change Color",
						systemIcon: "paintbrush",
						inlineChildren: true,
						actions: [
							{
								title: "Blue",
								systemIcon:
									color === "blue"
										? "paintbrush.fill"
										: "paintbrush",
								onPress: () => setColor("blue")
							},
							{
								title: "Red",
								systemIcon:
									color === "red"
										? "paintbrush.fill"
										: "paintbrush",
								onPress: () => setColor("red")
							}
						]
					},
					{
						title: "Transparent",
						systemIcon: "trash",
						destructive: true
					},
					{
						title: "Toggle Circle",
						systemIcon: "circlebadge",
						onPress: () => setCircle(v => !v)
					},
					{
						title: "Disabled Item",
						disabled: true
					}
				]}
				onCancel={() => {
					console.warn("CANCELLED");
				}}
				previewBackgroundColor="transparent"
			>
				<View
					style={[
						styles.rectangle,
						{
							backgroundColor: color,
							borderRadius: circle ? 999 : 0
						}
					]}
				/>
			</ContextMenu>

			<View style={styles.spacer} />

			<Menu
				title={"Dropdown Menu"}
				actions={[
					{
						title: "Test Item"
					}
				]}
			>
				<View
					style={[styles.rectangle, {backgroundColor: "purple"}]}
				/>
			</Menu>

			<View style={styles.spacer} />

			<ContextMenu
				title={"Custom Preview"}
				actions={[
					{
						title: "Test Item"
					}
				]}
				previewBackgroundColor="transparent"
				preview={
					<View
						style={[styles.rectangle, {backgroundColor: "green"}]}
					/>
				}
			>
				<View style={[styles.rectangle, {backgroundColor: "red"}]} />
			</ContextMenu>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center"
	},
	rectangle: {
		width: 200,
		height: 200
	},
	spacer: {
		height: 16
	}
});
