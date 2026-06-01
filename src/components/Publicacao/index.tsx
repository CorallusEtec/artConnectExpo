import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Text, View } from "react-native";
import { Avatar, Card, Divider, IconButton, Menu } from "react-native-paper";
import { ICON_SIZE, style } from "./style";

export function Publicacao() {
    const [menu, setMenu] = useState(false);
    


    return (
        <Card>
            {/* HEADER */}
            <Card.Content style={style.headerContainer}>
            <View style={style.headerContent}>
                <Avatar.Text label="SS" size={32} />
                <View>
                    <Text style={style.autorLabel}>Samuel Santiago</Text>
                    <Text style={style.publishDateLabel}>há 5 dias atrás</Text>
                </View>
            </View>
            <Menu
            visible={menu}
            anchor={<IconButton icon="dots-vertical" onPress={()=>setMenu(true)} />}
            anchorPosition="bottom"
            onDismiss={()=>setMenu(false)}
            >
                <Menu.Item title="Denunciar" leadingIcon={()=><Feather name="alert-circle" size={24} color="black" />}/>
            </Menu>
            </Card.Content>
            {/* LEGENDA */}
            <Card.Content>
                <Text>It is a long established fact that a reader will be distracted by the readable content 
                    e readable
                </Text>
            </Card.Content>
            {/* IMAGEM */}
            <Card.Cover style={style.img} source={{uri: "https://dummyimage.com/800x430/FFFFFF/lorem-ipsum.png&text=jsonplaceholder.org"}} />
            <Divider />
            <Card.Actions style={style.cardActionContainer}>
                {/* ACTIONS LEFT */}
                <View style={{flexDirection: "row", gap: 5}}>
                    {/* LIKE */}
                    <View style={style.actionContainer}>
                        <IconButton icon="thumb-up-outline" size={ICON_SIZE} />
                        <Text style={style.actionInsight}>1</Text>
                    </View>
                    {/* DESLIKE */}
                    <View style={style.actionContainer}>
                        <IconButton icon="thumb-down-outline" size={ICON_SIZE} />
                        <Text style={style.actionInsight}>0</Text>
                    </View>
                    {/* COMMENT */}
                    <View style={style.actionContainer}>    
                        <IconButton icon={()=><Feather name="message-circle" size={ICON_SIZE} color="black" />} />
                        <Text style={style.actionInsight}>0</Text>
                    </View>
                </View>
                {/* ACTIONS RIGHT */}
                <View>
                    <IconButton icon="bookmark-outline" />
                </View>
            </Card.Actions>
        </Card>
    )
}