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
    const [cTag, setCTag] = useState(null);
    const [prop, setProp] = useState([])
    const [stats, setStats] = useState(null)
    const classes = useStyles();
    const [iconId, setIconId] = useState(null)

    var ChampData;
    var i
    var people
    var c1name, c2name, c3name, c11name, c12name, c13name
    var c1tag, c2tag, c3tag, c11tag, c12tag, c13tag


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
                                                c1tag = ChampData[names[name]].tags
                                                //console.log(c1name)
                                            }

                                            if (ChampData[names[name]].key === prop2[1].championId.toString()) {
                                                c2name = names[name]
                                                c2tag = ChampData[names[name]].tags
                                                //console.log(c1name)
                                            }

                                            if (ChampData[names[name]].key === prop2[2].championId.toString()) {
                                                c3name = names[name]
                                                c3tag = ChampData[names[name]].tags
                                                //console.log(c1name)
                                            }

                                            if (ChampData[names[name]].key === prop2[3].championId.toString()) {
                                                c11name = names[name]
                                                c11tag = ChampData[names[name]].tags
                                                //console.log(c1name)
                                            }

                                            if (ChampData[names[name]].key === prop2[4].championId.toString()) {
                                                c12name = names[name]
                                                c12tag = ChampData[names[name]].tags
                                                //console.log(c1name)
                                            }

                                            if (ChampData[names[name]].key === prop2[5].championId.toString()) {
                                                c13name = names[name]
                                                c13tag = ChampData[names[name]].tags
                                                //console.log(c1name)
                                            }
                                        }
                                        setCName({ c1name: c1name, c2name: c2name, c3name: c3name, c11name: c11name, c12name: c12name, c13name: c13name })
                                        setCTag({ c1tag: c1tag, c2tag: c2tag, c3tag: c3tag, c11tag: c11tag, c12tag: c12tag, c13tag: c13tag })










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
    console.log(cTag)
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
                                    Current Top 3 Champions

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
                                                    {cTag?.c1tag !== undefined ?
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            {`${cTag.c1tag.join("/")}`}
                                                        </Typography>
                                                        : <></>}
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
                                                    {cTag?.c2tag !== undefined ?
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            {`${cTag.c2tag.join("/")}`}
                                                        </Typography>
                                                        : <></>}
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
                                                    {cTag?.c3tag !== undefined ?
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            {`${cTag.c3tag.join("/")}`}
                                                        </Typography>
                                                        : <></>}
                                                </Box>
                                            </CardContent>

                                        </Card>
                                    </CardActionArea>
                                </Grid>
                            </Grid>
                        </div>


                        : <></>}

                    {cName?.c11name !== undefined ?


                        <div style={{ width: "100%" }}>
                            <Box textAlign="center" p={3}>

                                <Typography variant='h5'>
                                    Top 3 Suggestions

                                </Typography>
                            </Box>

                            <Grid
                                container
                                spacing={4}
                                direction="row"
                                justify="center"

                            >

                                <Grid item xs={12} sm={6} md={3} >
                                    <CardActionArea component={RouterLink} to={`/champions/${cName?.c11name.replace(/\s+/g, '')}`}>
                                        <Card>
                                            <CardMedia
                                                component="img"
                                                alt="Champion Pic"
                                                height="100"

                                                image={`http://ddragon.leagueoflegends.com/cdn/11.9.1/img/champion/${cName?.c11name.replace(/\s+/g, '')}.png`}
                                                title="Champion"
                                            />
                                            <CardContent>
                                                <Box textAlign="center">
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        {`${cName?.c11name}`}
                                                    </Typography>
                                                    {cTag?.c11tag !== undefined ?
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            {`${cTag.c11tag.join("/")}`}
                                                        </Typography>
                                                        : <></>}
                                                </Box>
                                            </CardContent>

                                        </Card>
                                    </CardActionArea>

                                    <CardActionArea component={RouterLink} to={`/champions/${cName?.c12name.replace(/\s+/g, '')}`}>
                                        <Card>
                                            <CardMedia
                                                component="img"
                                                alt="Champion Pic"
                                                height="100"

                                                image={`http://ddragon.leagueoflegends.com/cdn/11.9.1/img/champion/${cName?.c12name.replace(/\s+/g, '')}.png`}
                                                title="Champion"
                                            />
                                            <CardContent>
                                                <Box textAlign="center">
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        {`${cName?.c12name}`}
                                                    </Typography>
                                                    {cTag?.c12tag !== undefined ?
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            {`${cTag.c12tag.join("/")}`}
                                                        </Typography>
                                                        : <></>}
                                                </Box>
                                            </CardContent>

                                        </Card>
                                    </CardActionArea>

                                    <CardActionArea component={RouterLink} to={`/champions/${cName?.c13name.replace(/\s+/g, '')}`}>
                                        <Card>
                                            <CardMedia
                                                component="img"
                                                alt="Champion Pic"
                                                height="100"

                                                image={`http://ddragon.leagueoflegends.com/cdn/11.9.1/img/champion/${cName?.c13name.replace(/\s+/g, '')}.png`}
                                                title="Champion"
                                            />
                                            <CardContent>
                                                <Box textAlign="center">
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        {`${cName?.c13name}`}
                                                    </Typography>
                                                    {cTag?.c13tag !== undefined ?
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            {`${cTag.c13tag.join("/")}`}
                                                        </Typography>
                                                        : <></>}
                                                </Box>
                                            </CardContent>

                                        </Card>
                                    </CardActionArea>
                                </Grid>
                            </Grid>
                        </div>


                        : <></>}





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