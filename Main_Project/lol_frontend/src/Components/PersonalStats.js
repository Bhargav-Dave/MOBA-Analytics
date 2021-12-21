import React, { useState } from "react";
// import Link from "@material-ui/core/Link";
// import { makeStyles } from "@material-ui/core/styles";
// import chartData from "../Data/chartData";
import {
    Button,
    FormControl,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    TextField,
    Typography,
    Card,
    CardContent,


    CardActionArea,

    CardMedia,
    Grid,
    Box,

} from "@material-ui/core";

import { Link as RouterLink } from "react-router-dom";
import PlayStyle from "./PlayStyle";
import PersonalWL from "./PersonalWL"
import axios from "axios"; //Uncomment this

var API = "RGAPI-b7870d20-cd2e-4a8f-b2fe-b59117497431"
var accountID, summonerID, pID, sLevel
const useStyles = makeStyles({
    root: {
        margin: 10,
        padding: 5,
    },
    table: {
        minWidth: "100%",
    },
    formControl: {
        textAlign: "center",
        margin: "5px",
        minWidth: 200,
    },
    selectBox: {
        margin: "5px",
        minWidth: 150,
    },
    selectEmpty: {
        // marginTop: theme.spacing(2),
    },
});

export default function PersonalStats() {

    const [reg, setReg] = useState("");
    const [sumName, setSumName] = useState("");
    const [fields, setFields] = useState({ summonername: "", region: "" });
    const [chartData, setChartData] = useState(null);
    const [styleData, setStyleData] = useState(null);
    const [leagueData, setLeagueData] = useState(null);
    const [flag, setFlag] = useState(false);
    const [cName, setCName] = useState(null);
    const [prop, setProp] = useState([])
    const [stats, setStats] = useState(null)
    const classes = useStyles();
    const [iconId, setIconId] = useState(null)

    var ChampData;
    var i
    var people
    var c1name, c2name, c3name


    function handleClick(e) {
        console.log(sumName);
        console.log(reg);
        setFields({ summonername: sumName, region: reg });
        // setFlag(false)

        axios
            .get('https://' + reg + '.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + sumName + '?api_key=' + API)
            .then((res) => {
                console.log(res);
                // setChartData(res.data);
                accountID = res.data.accountId
                summonerID = res.data.id
                pID = res.data.puuid
                sLevel = res.data.summonerLevel
                setIconId(res.data.profileIconId)
                axios
                    .get('https://' + reg + '.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/' + summonerID + '?api_key=' + API)
                    .then((res) => {
                        var prop2 = res.data
                        // console.log(res);
                        //console.log(res.data[0].championId)
                        // setChartData(res.data)
                        setProp(res.data)
                        // console.log(prop)
                        // setChartData(res.data);

                        axios
                            .get('https://' + reg + '.api.riotgames.com/lol/league/v4/entries/by-summoner/' + summonerID + '?api_key=' + API)
                            .then((res) => {

                                console.log(res)

                                setStats(res.data)
                                console.log(stats)

                                axios
                                    .get('https://ddragon.leagueoflegends.com/cdn/9.3.1/data/en_US/champion.json')
                                    .then((res) => {
                                        // console.log(res);
                                        // console.log(res.data[0].championId)

                                        ChampData = res.data.data
                                        // console.log(ChampData)
                                        // setChartData(res.data);

                                        const names = Object.keys(ChampData)
                                        // console.log(names)

                                        for (var name in names) {

                                            // console.log(ChampData[names[name]].key + ' ' + prop[0].championId.toString())
                                            if (ChampData[names[name]].key === prop2[0].championId.toString()) {
                                                c1name = names[name]
                                                //console.log(c1name)
                                            }

                                            if (ChampData[names[name]].key === prop2[1].championId.toString()) {
                                                c2name = names[name]
                                                //console.log(c1name)
                                            }

                                            if (ChampData[names[name]].key === prop2[2].championId.toString()) {
                                                c3name = names[name]
                                                //console.log(c1name)
                                            }
                                        }
                                        setCName({ c1name: c1name, c2name: c2name, c3name: c3name })









                                    })
                                    .catch((err) => console.log(err));


                            })
                            .catch((err) => console.log(err));



                    })
                    .catch((err) => console.log(err));

            })
            .catch((err) => console.log(err));
        //console.log(chartData);










    }

    console.log(cName)
    return (
        <div>
            <Typography component="p" variant="h4" color="textPrimary">
                Enter a Summoner name to get their personal statistics
            </Typography>
            <FormControl className={classes.formControl}>
                <TextField
                    variant="outlined"
                    required
                    id="summonerName"
                    label="Summoner Name"
                    name="summonerName"
                    onChange={(e) => {
                        setSumName(e.target.value);
                    }}
                    value={sumName}
                    autoFocus
                />
            </FormControl>
            <FormControl variant="outlined" className={classes.selectBox}>
                <InputLabel id="region select">Region</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="region-select"
                    value={reg}
                    onChange={(e) => {
                        setReg(e.target.value);
                    }}
                    label="region"
                >
                    <MenuItem value={"br1"}>br 1</MenuItem>
                    <MenuItem value={"eun1"}>eun 1</MenuItem>
                    <MenuItem value={"euw1"}>euw 1</MenuItem>
                    <MenuItem value={"jp1"}>jp 1</MenuItem>
                    <MenuItem value={"kr"}>kr</MenuItem>
                    <MenuItem value={"la1"}>la 1</MenuItem>
                    <MenuItem value={"la2"}>la 2</MenuItem>
                    <MenuItem value={"na1"}>na 1</MenuItem>
                    <MenuItem value={"oc1"}>oc 1</MenuItem>
                    <MenuItem value={"ru"}>ru</MenuItem>
                    <MenuItem value={"tr1"}>tr 1</MenuItem>
                </Select>
            </FormControl>
            <Typography variant="h5">
                <Button variant="contained" color="primary" onClick={(e) => handleClick(e)}>
                    Search
                </Button>
            </Typography>

            {fields.region !== "" && fields.summonername !== "" && (
                <>

                    <Box textAlign='center' p={3}>

                        <Grid
                            container
                            spacing={4}
                            direction="row"
                            justify="center"

                        >

                            <Grid item xs={12} sm={6} md={3} >

                                <Typography display="block" variant='h4'>
                                    {`${sumName}`}



                                </Typography>

                                <br />


                                {iconId !== null ?


                                    <Card>
                                        <CardMedia
                                            component="img"
                                            alt="Profile Pic"
                                            height="100"

                                            image={`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/profileicon/${iconId}.png`}
                                            title="Champion"
                                        />

                                    </Card>

                                    : <></>}
                            </Grid>
                        </Grid>
                    </Box>


                    {cName?.c1name !== undefined ?


                        <div style={{ width: "100%" }}>
                            <Box textAlign="center" p={3}>

                                <Typography variant='h5'>
                                    Top 3 Champions:

                                </Typography>
                            </Box>

                            <Grid
                                container
                                spacing={4}
                                direction="row"
                                justify="center"

                            >

                                <Grid item xs={12} sm={6} md={3} >
                                    <CardActionArea component={RouterLink} to={`/champions/${cName?.c1name.replace(/\s+/g, '')}`}>
                                        <Card>
                                            <CardMedia
                                                component="img"
                                                alt="Champion Pic"
                                                height="100"

                                                image={`http://ddragon.leagueoflegends.com/cdn/11.9.1/img/champion/${cName?.c1name.replace(/\s+/g, '')}.png`}
                                                title="Champion"
                                            />
                                            <CardContent>
                                                <Box textAlign="center">
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        {`${cName?.c1name}`}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        {`Mastery Level at ${prop[0].championLevel} with ${prop[0].championPoints} points`}
                                                    </Typography>
                                                </Box>
                                            </CardContent>

                                        </Card>
                                    </CardActionArea>

                                    <CardActionArea component={RouterLink} to={`/champions/${cName?.c2name.replace(/\s+/g, '')}`}>
                                        <Card>
                                            <CardMedia
                                                component="img"
                                                alt="Champion Pic"
                                                height="100"

                                                image={`http://ddragon.leagueoflegends.com/cdn/11.9.1/img/champion/${cName?.c2name.replace(/\s+/g, '')}.png`}
                                                title="Champion"
                                            />
                                            <CardContent>
                                                <Box textAlign="center">
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        {`${cName?.c2name}`}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        {`Mastery Level at ${prop[1].championLevel} with ${prop[1].championPoints} points`}
                                                    </Typography>
                                                </Box>
                                            </CardContent>

                                        </Card>
                                    </CardActionArea>

                                    <CardActionArea component={RouterLink} to={`/champions/${cName?.c3name.replace(/\s+/g, '')}`}>
                                        <Card>
                                            <CardMedia
                                                component="img"
                                                alt="Champion Pic"
                                                height="100"

                                                image={`http://ddragon.leagueoflegends.com/cdn/11.9.1/img/champion/${cName?.c3name.replace(/\s+/g, '')}.png`}
                                                title="Champion"
                                            />
                                            <CardContent>
                                                <Box textAlign="center">
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        {`${cName?.c3name}`}
                                                    </Typography>

                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        {`Mastery Level at ${prop[2].championLevel} with ${prop[2].championPoints} points`}
                                                    </Typography>
                                                </Box>
                                            </CardContent>

                                        </Card>
                                    </CardActionArea>
                                </Grid>
                            </Grid>
                        </div>
                        : <></>}


                    <>
                        {stats !== null ?
                            <div style={{ width: "100%" }}>
                                <Box textAlign="center" p={3}>
                                    <Typography variant="h3">Match Statistics:</Typography>
                                </Box>

                                <Grid container spacing={4} direction="row" justify="center">
                                    <Grid item xs={12} sm={6} md={3}>
                                        <Box border={1}>
                                            <Card>
                                                <CardContent>
                                                    <Box textAlign="center">
                                                        <Typography gutterBottom variant="h6" component="h3">
                                                            {`Flex - Summoner's Rift`}
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>


                                            <Card>
                                                <CardContent>
                                                    <Box textAlign="center">
                                                        <Typography gutterBottom variant="subtitle2" component="h3">
                                                            {`League Points: ${stats[0].leaguePoints}`}
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>

                                            <Card>
                                                <CardContent>
                                                    <Box textAlign="center">
                                                        <Typography gutterBottom variant="subtitle2" component="h3">
                                                            {`Wins: ${stats[0].wins}`}
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>

                                            <Card>
                                                <CardContent>
                                                    <Box textAlign="center">
                                                        <Typography gutterBottom variant="subtitle2" component="h3">
                                                            {`Losses: ${stats[0].losses}`}
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>

                                            <Card>
                                                <CardContent>
                                                    <Box textAlign="center">
                                                        {stats[0].tier !== undefined ?
                                                            <Typography gutterBottom variant="subtitle2" component="h3">
                                                                {`Tier: ${stats[0].tier} ${stats[0].rank}`}
                                                            </Typography>
                                                            : <Typography gutterBottom variant="subtitle2" component="h3">
                                                                {`Tier: None`}
                                                            </Typography>}
                                                    </Box>
                                                </CardContent>
                                            </Card>



                                        </Box>

                                        <Box border={1}>
                                            <Card>
                                                <CardContent>
                                                    <Box textAlign="center">
                                                        <Typography gutterBottom variant="h6" component="h3">
                                                            {`Ranked Pairs`}
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>


                                            <Card>
                                                <CardContent>
                                                    <Box textAlign="center">
                                                        <Typography gutterBottom variant="subtitle2" component="h3">
                                                            {`League Points: ${stats[1].leaguePoints}`}
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>

                                            <Card>
                                                <CardContent>
                                                    <Box textAlign="center">
                                                        <Typography gutterBottom variant="subtitle2" component="h3">
                                                            {`Wins: ${stats[1].wins}`}
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>

                                            <Card>
                                                <CardContent>
                                                    <Box textAlign="center">
                                                        <Typography gutterBottom variant="subtitle2" component="h3">
                                                            {`Losses: ${stats[1].losses}`}
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>

                                            <Card>
                                                <CardContent>
                                                    <Box textAlign="center">
                                                        {stats[1].tier !== undefined ?
                                                            <Typography gutterBottom variant="subtitle2" component="h3">
                                                                {`Tier: ${stats[1].tier} ${stats[1].rank}`}
                                                            </Typography>
                                                            : <Typography gutterBottom variant="subtitle2" component="h3">
                                                                {`Tier: None`}
                                                            </Typography>}
                                                    </Box>
                                                </CardContent>
                                            </Card>



                                        </Box>

                                        <Box border={1}>
                                            <Card>
                                                <CardContent>
                                                    <Box textAlign="center">
                                                        <Typography gutterBottom variant="h6" component="h3">
                                                            {`Ranked Solo 5v5`}
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>


                                            <Card>
                                                <CardContent>
                                                    <Box textAlign="center">
                                                        <Typography gutterBottom variant="subtitle2" component="h3">
                                                            {`League Points: ${stats[2].leaguePoints}`}
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>

                                            <Card>
                                                <CardContent>
                                                    <Box textAlign="center">
                                                        <Typography gutterBottom variant="subtitle2" component="h3">
                                                            {`Wins: ${stats[2].wins}`}
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>

                                            <Card>
                                                <CardContent>
                                                    <Box textAlign="center">
                                                        <Typography gutterBottom variant="subtitle2" component="h3">
                                                            {`Losses: ${stats[2].losses}`}
                                                        </Typography>
                                                    </Box>
                                                </CardContent>
                                            </Card>

                                            <Card>
                                                <CardContent>
                                                    <Box textAlign="center">
                                                        {stats[2].tier !== undefined ?
                                                            <Typography gutterBottom variant="subtitle2" component="h3">
                                                                {`Tier: ${stats[2].tier} ${stats[2].rank}`}
                                                            </Typography>
                                                            : <Typography gutterBottom variant="subtitle2" component="h3">
                                                                {`Tier: None`}
                                                            </Typography>}
                                                    </Box>
                                                </CardContent>
                                            </Card>



                                        </Box>

                                    </Grid>
                                </Grid>
                            </div>
                            : <></>}
                    </>

                    {/* <Box textAlign='Center' p={3}>

                        <PlayStyle data={styleData} />
                    </Box> */}

                    {/* {console.log(flag)} */}
                    {/* {!flag && leagueData !== null &&
                        <PersonalWL data={leagueData} />
                    } */}
                </>


            )}
        </div>
    );
}