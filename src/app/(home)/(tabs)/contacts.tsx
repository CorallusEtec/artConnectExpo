import { Header } from "@/components";
import { ChatContactsHistoryList } from "@/components/Chat/ChatContacts/ChatContactsHistoryList";
import { style } from "@/style/pages/contacts";
import { ScrollView } from "react-native";
import { List, Text } from "react-native-paper";

export default function Contacts() {
  return (
    <>
      <Header />
      <ScrollView style={style.container}>
        <Text variant="bodyLarge">Histórico de conversas</Text>
        <List.Section>
          <ChatContactsHistoryList />
        </List.Section>
      </ScrollView>
    </>
  );
}
