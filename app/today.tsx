import Gap from "@/components/shared/Gap";
import SubjectBox from "@/components/shared/SubjectBox";
import ScreenView from "@/elements/ScreenView";
import { DataItem } from "@/models/listTypes";
import { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { DataContext } from "./_layout";

function Today() {
	const dataContext = useContext(DataContext);

	const [data, setData] = useState<DataItem[]>([]);

	useEffect(() => {
		async function initData() {
			setData(await dataContext.getTodaysSchedule());
		}

		initData();
	}, []);

	return (
		<ScreenView>
			<FlatList
				data={data}
				renderItem={({ item }) => {
					if (typeof item === "number") {
						return <Gap hoursGap={item} />;
					}

					return <SubjectBox subject={item} />;
				}}
			/>
		</ScreenView>
	);
}

export default Today;
