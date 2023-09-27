import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";

interface SearchResultListProps {
  data: Array<any>;
  onSlectedItem: (value: any) => void;
}

const SearchResultList = ({ data, onSlectedItem }: SearchResultListProps) => {
  return (
    <List
      dense
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        maxHeight: "250px",
        overflowY: "auto",
      }}
    >
      {data.map((value) => {
        return (
          <ListItem
            key={value._id}
            disablePadding
            onClick={(e) => {
              onSlectedItem(value);
            }}
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar>A</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={value.name}
                secondary={`${value.email} (${value.phone})`}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default SearchResultList;
