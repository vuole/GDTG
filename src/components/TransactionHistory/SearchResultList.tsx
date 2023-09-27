import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";

interface SearchResultListProps {
  data: Array<any>;
  onSlectedItem?: (value: any) => void;
  fullHeight?: boolean;
  fullSubInfo?: boolean;
  highlightFirstItem?: boolean;
}

const SearchResultList = ({
  data,
  onSlectedItem,
  fullHeight,
  fullSubInfo,
  highlightFirstItem,
}: SearchResultListProps) => {
  return (
    <List
      dense
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        maxHeight: fullHeight ? "100%" : "250px",
        overflowY: "auto",
      }}
    >
      {data.map((value, i) => {
        return (
          <ListItem
            key={value._id}
            disablePadding
            onClick={(e) => {
              onSlectedItem?.(value);
            }}
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar>A</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  i === 0 && highlightFirstItem
                    ? `${value.name} (Admin)`
                    : `${value.name}`
                }
                secondary={
                  fullSubInfo
                    ? `${value.email} (${value.phone})`
                    : `${value.phone}`
                }
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default SearchResultList;
