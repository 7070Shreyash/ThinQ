import { useState } from "react";
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery,
  } from "@mui/material";
  import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close,
  } from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {

  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;


  const utilityFunc = () => {
    navigate("/");
    dispatch(setLogout());
  };

    return (
        <FlexBetween padding = "0.5rem 6%" backgroundColor = {alt}>
        <FlexBetween gap = "1.75rem">
            <Typography 
                fontWeight="bold"
                fontSize = "2rem"
                color = "red"
                onClick={()=> navigate("/blogspage")}
                sx={{
                    "&:hover": {
                        color: "darkred",
                        cursor: "pointer",
                      },
                }}
            > 
            ThinQ
            </Typography>
            {isNonMobileScreens && (
                <FlexBetween 
                backgroundColor = {neutralLight}
                borderRadius="10px"
                padding= "0.1rem 1.5rem"
                > 
                <InputBase placeholder="Search..."/>
                <IconButton>
                    <Search/>
                </IconButton>
                </FlexBetween>
            )}
        </FlexBetween>
        {isNonMobileScreens ? (
            <FlexBetween gap = "2rem">
            <IconButton onClick={()=> dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
                <Box>
                <Box>
              <DarkMode sx={{ fontSize: "25px" }} />
              </Box>
              <Box>
              <Typography
                color = {dark}
                fontSize="0.8rem"
              >Darkmode</Typography>
              </Box>
              </Box>
            ) : (
                <Box>
                  <Box>
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
              
              </Box>
              <Box>
              <Typography
                color = {dark}
                fontSize="0.8rem"
              >Lightmode</Typography>
              </Box>
              </Box>
            )}
            </IconButton>
            <IconButton onClick = {() => navigate("/quespage")}>
            <Box>
            <Box>
            <Message sx={{ fontSize: "25px" }} />
            </Box>
            <Box>
            <Typography
                color = {dark}
                fontSize="0.8rem"
              >QnA</Typography>
            </Box>
            </Box>
            </IconButton>
            <IconButton>
            <Box>
              <Box>
          <Notifications sx={{ fontSize: "25px" }} />
          </Box>
          <Box>
          <Typography
          color = {dark}
          fontSize="0.8rem"
        > Notifications
          </Typography>
          </Box>
          </Box>
          </IconButton>

          <IconButton>
            <Box>
          <Help sx={{ fontSize: "25px" }} />
          <Typography
          color = {dark}
          fontSize="0.8rem"
        > Help
          </Typography>
          </Box>
          </IconButton>
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={utilityFunc}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
        ) : (
            <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Menu />
          </IconButton>
          )}

{!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton onClick={()=> dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
                <Box>
                <Box>
              <DarkMode sx={{ fontSize: "25px" }} />
              </Box>
              <Box>
              <Typography
                color = {dark}
                fontSize="0.8rem"
              >Darkmode</Typography>
              </Box>
              </Box>
            ) : (
                <Box>
                  <Box>
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
              
              </Box>
              <Box>
              <Typography
                color = {dark}
                fontSize="0.8rem"
              >Lightmode</Typography>
              </Box>
              </Box>
            )}
            </IconButton>
            <IconButton onClick = {() => navigate("/quespage")}>
            <Box>
            <Box>
            <Message sx={{ fontSize: "25px" }} />
            </Box>
            <Box>
            <Typography
                color = {dark}
                fontSize="0.8rem"
              >QnA</Typography>
            </Box>
            </Box>
            </IconButton>
            <IconButton>
            <Box>
              <Box>
          <Notifications sx={{ fontSize: "25px" }} />
          </Box>
          <Box>
          <Typography
          color = {dark}
          fontSize="0.8rem"
        > Notifications
          </Typography>
          </Box>
          </Box>
          </IconButton>

          <IconButton>
            <Box>
          <Help sx={{ fontSize: "25px" }} />
          <Typography
          color = {dark}
          fontSize="0.8rem"
        > Help
          </Typography>
          </Box>
          </IconButton>
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={utilityFunc}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
        </FlexBetween>
    );
};
export default Navbar;