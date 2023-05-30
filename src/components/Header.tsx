import { Avatar, HStack, Heading } from "native-base";
import React from "react";

interface HeaderProps {
    name: string;
    picture: string;
}

const Header = (props: HeaderProps) => {
    return (
        <HStack justifyContent="space-between" alignItems={'flex-end'} width={'full'}>
            <Heading size="xl" color={'coolGray.900'}>
                Hello {props.name ?? ''}
            </Heading>
            <Avatar
                bg="coolGray.900"
                alignSelf="center"
                width={8}
                height={8}
                source={props.picture && { uri: props.picture }}
            />
        </HStack>
    );
};

export default Header;