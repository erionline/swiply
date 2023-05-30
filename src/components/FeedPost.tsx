import { Box, Text, Icon, HStack, Avatar, VStack, Button } from "native-base"
import React from "react"
import { UserPost } from "../utils/entities/user.entity";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface FeedPostProps {
    post: UserPost;
    index: number;
    posts: UserPost[];
    setPosts: (posts: UserPost[]) => void;
    onLike: (post: UserPost) => void;
    withActions: boolean;
}

const FeedPost = (props: FeedPostProps) => {
    return (
        <Box
        key={`post-${props.index}`}
        bg="coolGray.50"
        shadow={2}
        rounded="lg"
        p={5}
        my={4}
        width={'full'}
      >
        {props.withActions && <React.Fragment>
            <Button
          position={'absolute'}
          bottom={-15}
          right={-6}
          bg={'green.500'}
          width={"12%"}
          height={"8"}
          onPress={() => props.onLike(props.post)}
          leftIcon={
            <Icon
              mb="1"
              as={<MaterialCommunityIcons name="heart" />}
              color="white"
              size="sm"
            />
          }
        />
        <Button
          position={'absolute'}
          bottom={-15}
          left={-6}
          bg={'rose.500'}
          width={"12%"}
          height={"8"}
          onPress={() => props.setPosts(props.posts.filter((p) => p !== props.post))}
          leftIcon={
            <Icon
              mb="1"
              as={<MaterialCommunityIcons name="heart-broken" />}
              color="white"
              size="sm"
            />
          }
        />
        </React.Fragment>
        }

        <Text>{props.post.content}</Text>

        <HStack justifyContent="space-between" alignItems="center" mt={5}>
          <HStack alignItems="center">
            <Avatar
              bg="coolGray.500"
              size="sm"
              source={props.post.authorAvatar && { uri: props.post.authorAvatar }}
            />
            <VStack ml={2}>
              <Text fontWeight="bold" color="coolGray.900">
                {props.post.authorName ?? "Unknown"}
              </Text>
              <Text marginTop={-1} color="coolGray.500">
                @{props.post.authorName ? props.post.authorName.toLowerCase().replace(" ", "").trim() : "unknown"}
              </Text>
            </VStack>
          </HStack>
          <HStack alignItems="center">
          </HStack>
        </HStack>
      </Box>
    )
}

export default FeedPost