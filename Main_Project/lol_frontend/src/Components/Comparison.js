import React, { useState } from "react";
// import Link from "@material-ui/core/Link";
// import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
import {
    Button,
    ButtonGroup,
    FormControl,
    Grid,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    Box,
    Card,
    CardMedia,
    CardContent,
    CardActionArea,
    TextField,
} from "@material-ui/core";
import axios from "axios";
import { borders } from '@material-ui/system'
import PersonalWL from "./PersonalWL"

var API = "RGAPI-b7870d20-cd2e-4a8f-b2fe-b59117497431"
var accountID1, summonerID1, pID1, sLevel1, accountID2, summonerID2, pID2, sLevel2

const useStyles = makeStyles({
    root: {
        margin: 10,
        padding: 5,
        background: "#db8762",
    },
    root2: {
        background: "#83c4ef"
    },
    table: {
        minWidth: "100%",
    },
    formControl: {
        textAlign: "center",
        margin: 5,
        minWidth: 170,
    },
    selectEmpty: {
        // marginTop: theme.spacing(2),
    },

});



export default function Comparison() {
    const [fields1, setFields1] = useState({ summonername1: "", region1: "" });
    const [fields2, setFields2] = useState({ summonername2: "", region2: "" });
    const [reg1, setReg1] = useState();
    const [reg2, setReg2] = useState();
    const [play1, setPlay1] = useState();
    const [play2, setPlay2] = useState();
    const [play1det, setPlay1det] = useState(null);
    const [play2det, setPlay2det] = useState(null);
    const [flag1, setFlag1] = useState(false);
    const [flag2, setFlag2] = useState(false);
    const [cName1, setCName1] = useState(null);
    const [prop1, setProp1] = useState([])
    const [stats1, setStats1] = useState(null)
    const classes = useStyles();
    const [iconId1, setIconId1] = useState(null)
    const [cName2, setCName2] = useState(null);
    const [prop21, setProp21] = useState([])
    const [stats2, setStats2] = useState(null)
    // const classes = useStyles();
    const [iconId2, setIconId2] = useState(null)

    var ChampData1, ChampData2;

    var c1name1, c2name1, c3name1, c1name2, c2name2, c3name2

    function handleSubmit() {


        console.log(play1);
        console.log(reg1);
        setFields1({ summonername1: play1, region1: reg1 });
        console.log(play2);
        console.log(reg2);
        setFields2({ summonername1: play2, region1: reg2 });
        // setFlag(false)

        axios
            .get('https://' + reg1 + '.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + play1 + '?api_key=' + API)
            .then((res) => {
                console.log(res);
                // setChartData(res.data);
                accountID1 = res.data.accountId
                summonerID1 = res.data.id
                pID1 = res.data.puuid
                sLevel1 = res.data.summonerLevel
                setIconId1(res.data.profileIconId)
                axios
                    .get('https://' + reg1 + '.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/' + summonerID1 + '?api_key=' + API)
                    .then((res) => {
                        var prop2 = res.data
                        // console.log(res);
                        //console.log(res.data[0].championId)
                        // setChartData(res.data)
                        setProp1(res.data)
                        // console.log(prop)
                        // setChartData(res.data);

                        axios
                            .get('https://' + reg1 + '.api.riotgames.com/lol/league/v4/entries/by-summoner/' + summonerID1 + '?api_key=' + API)
                            .then((res) => {

                                console.log(res)

                                setStats1(res.data)
                                console.log(stats1)

                                axios
                                    .get('https://ddragon.leagueoflegends.com/cdn/9.3.1/data/en_US/champion.json')
                                    .then((res) => {
                                        // console.log(res);
                                        // console.log(res.data[0].championId)

                                        ChampData1 = res.data.data
                                        // console.log(ChampData)
                                        // setChartData(res.data);

                                        const names1 = Object.keys(ChampData1)
                                        // console.log(names)

                                        for (var name1 in names1) {

                                            // console.log(ChampData[names[name]].key + ' ' + prop[0].championId.toString())
                                            if (ChampData1[names1[name1]].key === prop2[0].championId.toString()) {
                                                c1name1 = names1[name1]
                                                //console.log(c1name)
                                            }

                                            if (ChampData1[names1[name1]].key === prop2[1].championId.toString()) {
                                                c2name1 = names1[name1]
                                                //console.log(c1name)
                                            }

                                            if (ChampData1[names1[name1]].key === prop2[2].championId.toString()) {
                                                c3name1 = names1[name1]
                                                //console.log(c1name)
                                            }
                                        }
                                        setCName1({ c1name1: c1name1, c2name1: c2name1, c3name1: c3name1 })









                                    })
                                    .catch((err) => console.log(err));


                            })
                            .catch((err) => console.log(err));



                    })
                    .catch((err) => console.log(err));

            })
            .catch((err) => console.log(err));

        axios
            .get('https://' + reg2 + '.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + play2 + '?api_key=' + API)
            .then((res) => {
                console.log(res);
                // setChartData(res.data);
                accountID2 = res.data.accountId
                summonerID2 = res.data.id
                pID2 = res.data.puuid
                sLevel2 = res.data.summonerLevel
                setIconId2(res.data.profileIconId)
                axios
                    .get('https://' + reg2 + '.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/' + summonerID2 + '?api_key=' + API)
                    .then((res) => {
                        var prop22 = res.data
                        // console.log(res);
                        //console.log(res.data[0].championId)
                        // setChartData(res.data)
                        setProp21(res.data)
                        // console.log(prop)
                        // setChartData(res.data);

                        axios
                            .get('https://' + reg2 + '.api.riotgames.com/lol/league/v4/entries/by-summoner/' + summonerID2 + '?api_key=' + API)
                            .then((res) => {

                                console.log(res)

                                setStats2(res.data)
                                console.log(stats2)

                                axios
                                    .get('https://ddragon.leagueoflegends.com/cdn/9.3.1/data/en_US/champion.json')
                                    .then((res) => {
                                        // console.log(res);
                                        // console.log(res.data[0].championId)

                                        ChampData2 = res.data.data
                                        // console.log(ChampData)
                                        // setChartData(res.data);

                                        const names2 = Object.keys(ChampData2)
                                        // console.log(names)

                                        for (var name2 in names2) {

                                            // console.log(ChampData[names[name]].key + ' ' + prop[0].championId.toString())
                                            if (ChampData2[names2[name2]].key === prop22[0].championId.toString()) {
                                                c1name2 = names2[name2]
                                                //console.log(c1name)
                                            }

                                            if (ChampData2[names2[name2]].key === prop22[1].championId.toString()) {
                                                c2name2 = names2[name2]
                                                //console.log(c1name)
                                            }

                                            if (ChampData2[names2[name2]].key === prop22[2].championId.toString()) {
                                                c3name2 = names2[name2]
                                                //console.log(c1name)
                                            }
                                        }
                                        setCName2({ c1name2: c1name2, c2name2: c2name2, c3name2: c3name2 })









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

    return (
        <React.Fragment>
            <Grid container justify="center">
                <Grid item lg={6}>
                    <FormControl className={classes.formControl}>
                        <TextField
                            variant="outlined"
                            required
                            id="summonerName"
                            label="Summoner Name"
                            name="summonerName"
                            value={play1 || ""}
                            onChange={(e) => setPlay1(e.target.value)}
                            autoFocus
                        />
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="region select">Region</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="region-select"
                            value={reg1}
                            onChange={(e) => setReg1(e.target.value)}
                            label="Challenger"
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
                </Grid>
                <Grid item lg={6}>
                    <FormControl className={classes.formControl}>
                        <TextField
                            variant="outlined"
                            required
                            id="summonerName"
                            label="Summoner Name"
                            name="summonerName"
                            value={play2 || ""}
                            onChange={(e) => setPlay2(e.target.value)}
                        />
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="region select">Region</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="region-select"
                            value={reg2}
                            onChange={(e) => setReg2(e.target.value)}
                            label="Challenger"
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
                </Grid>
                <Grid item lg={12}>
                    <Typography variant="h3">
                        <ButtonGroup variant="contained" color="primary">
                            <Button fullWidth onClick={() => handleSubmit()}>
                                Compare!
                            </Button>
                        </ButtonGroup>
                    </Typography>
                </Grid>
            </Grid>
            <Grid container justify="center" rowSpacing={3} columnSpacing={{ xs: 1 }}>
                <Grid item xs={6}>
                    <item>
                        {fields1.region1 !== "" && fields1.summonername1 !== "" && (
                            <>

                                <Box textAlign='center' p={3}>

                                    <Grid


                                    >

                                        <Grid >

                                            <Typography display="block" variant='h4'>
                                                {`${play1}`}



                                            </Typography>

                                            <br />


                                            {iconId1 !== null ?


                                                <Card>
                                                    <CardMedia
                                                        component="img"
                                                        alt="Profile Pic"
                                                        height="100"

                                                        image={`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/profileicon/${iconId1}.png`}
                                                        title="Champion"
                                                    />

                                                </Card>

                                                : <></>}
                                        </Grid>
                                    </Grid>
                                </Box>


                                {cName1?.c1name1 !== undefined ?


                                    <div style={{ width: "100%" }}>
                                        <Box textAlign="center" p={3}>

                                            <Typography variant='h5'>
                                                Top 3 Champions:

                                            </Typography>
                                        </Box>

                                        <Grid


                                        >

                                            <Grid  >
                                                <CardActionArea component={RouterLink} to={`/champions/${cName1?.c1name1.replace(/\s+/g, '')}`}>
                                                    <Card>
                                                        <CardMedia
                                                            component="img"
                                                            alt="Champion Pic"
                                                            height="100"

                                                            image={`http://ddragon.leagueoflegends.com/cdn/11.9.1/img/champion/${cName1?.c1name1.replace(/\s+/g, '')}.png`}
                                                            title="Champion"
                                                        />
                                                        <CardContent>
                                                            <Box textAlign="center">
                                                                <Typography gutterBottom variant="h5" component="h2">
                                                                    {`${cName1?.c1name1}`}
                                                                </Typography>
                                                                <Typography variant="body2" color="textSecondary" component="p">
                                                                    {`Mastery Level at ${prop1[0].championLevel} with ${prop1[0].championPoints} points`}
                                                                </Typography>
                                                            </Box>
                                                        </CardContent>

                                                    </Card>
                                                </CardActionArea>

                                                <CardActionArea component={RouterLink} to={`/champions/${cName1?.c2name1.replace(/\s+/g, '')}`}>
                                                    <Card>
                                                        <CardMedia
                                                            component="img"
                                                            alt="Champion Pic"
                                                            height="100"

                                                            image={`http://ddragon.leagueoflegends.com/cdn/11.9.1/img/champion/${cName1?.c2name1.replace(/\s+/g, '')}.png`}
                                                            title="Champion"
                                                        />
                                                        <CardContent>
                                                            <Box textAlign="center">
                                                                <Typography gutterBottom variant="h5" component="h2">
                                                                    {`${cName1?.c2name1}`}
                                                                </Typography>
                                                                <Typography variant="body2" color="textSecondary" component="p">
                                                                    {`Mastery Level at ${prop1[1].championLevel} with ${prop1[1].championPoints} points`}
                                                                </Typography>
                                                            </Box>
                                                        </CardContent>

                                                    </Card>
                                                </CardActionArea>

                                                <CardActionArea component={RouterLink} to={`/champions/${cName1?.c3name1.replace(/\s+/g, '')}`}>
                                                    <Card>
                                                        <CardMedia
                                                            component="img"
                                                            alt="Champion Pic"
                                                            height="100"

                                                            image={`http://ddragon.leagueoflegends.com/cdn/11.9.1/img/champion/${cName1?.c3name1.replace(/\s+/g, '')}.png`}
                                                            title="Champion"
                                                        />
                                                        <CardContent>
                                                            <Box textAlign="center">
                                                                <Typography gutterBottom variant="h5" component="h2">
                                                                    {`${cName1?.c3name1}`}
                                                                </Typography>

                                                                <Typography variant="body2" color="textSecondary" component="p">
                                                                    {`Mastery Level at ${prop1[2].championLevel} with ${prop1[2].championPoints} points`}
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
                                    {stats1 !== null ?
                                        <div style={{ width: "100%" }}>
                                            <Box textAlign="center" p={3}>
                                                <Typography variant="h3">Match Statistics:</Typography>
                                            </Box>

                                            <Grid >
                                                <Grid >
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
                                                                        {`League Points: ${stats1[0].leaguePoints}`}
                                                                    </Typography>
                                                                </Box>
                                                            </CardContent>
                                                        </Card>

                                                        <Card>
                                                            <CardContent>
                                                                <Box textAlign="center">
                                                                    <Typography gutterBottom variant="subtitle2" component="h3">
                                                                        {`Wins: ${stats1[0].wins}`}
                                                                    </Typography>
                                                                </Box>
                                                            </CardContent>
                                                        </Card>

                                                        <Card>
                                                            <CardContent>
                                                                <Box textAlign="center">
                                                                    <Typography gutterBottom variant="subtitle2" component="h3">
                                                                        {`Losses: ${stats1[0].losses}`}
                                                                    </Typography>
                                                                </Box>
                                                            </CardContent>
                                                        </Card>

                                                        <Card>
                                                            <CardContent>
                                                                <Box textAlign="center">
                                                                    {stats1[0].tier !== undefined ?
                                                                        <Typography gutterBottom variant="subtitle2" component="h3">
                                                                            {`Tier: ${stats1[0].tier} ${stats1[0].rank}`}
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
                                                                        {`League Points: ${stats1[1].leaguePoints}`}
                                                                    </Typography>
                                                                </Box>
                                                            </CardContent>
                                                        </Card>

                                                        <Card>
                                                            <CardContent>
                                                                <Box textAlign="center">
                                                                    <Typography gutterBottom variant="subtitle2" component="h3">
                                                                        {`Wins: ${stats1[1].wins}`}
                                                                    </Typography>
                                                                </Box>
                                                            </CardContent>
                                                        </Card>

                                                        <Card>
                                                            <CardContent>
                                                                <Box textAlign="center">
                                                                    <Typography gutterBottom variant="subtitle2" component="h3">
                                                                        {`Losses: ${stats1[1].losses}`}
                                                                    </Typography>
                                                                </Box>
                                                            </CardContent>
                                                        </Card>

                                                        <Card>
                                                            <CardContent>
                                                                <Box textAlign="center">
                                                                    {stats1[1].tier !== undefined ?
                                                                        <Typography gutterBottom variant="subtitle2" component="h3">
                                                                            {`Tier: ${stats1[1].tier} ${stats1[1].rank}`}
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
                                                                        {`League Points: ${stats1[2].leaguePoints}`}
                                                                    </Typography>
                                                                </Box>
                                                            </CardContent>
                                                        </Card>

                                                        <Card>
                                                            <CardContent>
                                                                <Box textAlign="center">
                                                                    <Typography gutterBottom variant="subtitle2" component="h3">
                                                                        {`Wins: ${stats1[2].wins}`}
                                                                    </Typography>
                                                                </Box>
                                                            </CardContent>
                                                        </Card>

                                                        <Card>
                                                            <CardContent>
                                                                <Box textAlign="center">
                                                                    <Typography gutterBottom variant="subtitle2" component="h3">
                                                                        {`Losses: ${stats1[2].losses}`}
                                                                    </Typography>
                                                                </Box>
                                                            </CardContent>
                                                        </Card>

                                                        <Card>
                                                            <CardContent>
                                                                <Box textAlign="center">
                                                                    {stats1[2].tier !== undefined ?
                                                                        <Typography gutterBottom variant="subtitle2" component="h3">
                                                                            {`Tier: ${stats1[2].tier} ${stats1[2].rank}`}
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
                    </item>
                </Grid>

                <Grid item xs={6}>
                    <item>
                        {fields2.region2 !== "" && fields2.summonername2 !== "" && (
                            <>

                                <Box textAlign='center' p={3}>

                                    <Grid


                                    >

                                        <Grid>

                                            <Typography display="block" variant='h4'>
                                                {`${play2}`}



                                            </Typography>

                                            <br />


                                            {iconId2 !== null ?


                                                <Card>
                                                    <CardMedia
                                                        component="img"
                                                        alt="Profile Pic"
                                                        height="100"

                                                        image={`http://ddragon.leagueoflegends.com/cdn/11.24.1/img/profileicon/${iconId2}.png`}
                                                        title="Champion"
                                                    />

                                                </Card>

                                                : <></>}
                                        </Grid>
                                    </Grid>
                                </Box>


                                {cName2?.c1name2 !== undefined ?


                                    <div style={{ width: "100%" }}>
                                        <Box textAlign="center" p={3}>

                                            <Typography variant='h5'>
                                                Top 3 Champions:

                                            </Typography>
                                        </Box>

                                        <Grid


                                        >

                                            <Grid>
                                                <CardActionArea component={RouterLink} to={`/champions/${cName2?.c1name2.replace(/\s+/g, '')}`}>
                                                    <Card>
                                                        <CardMedia
                                                            component="img"
                                                            alt="Champion Pic"
                                                            height="100"

                                                            image={`http://ddragon.leagueoflegends.com/cdn/11.9.1/img/champion/${cName2?.c1name2.replace(/\s+/g, '')}.png`}
                                                            title="Champion"
                                                        />
                                                        <CardContent>
                                                            <Box textAlign="center">
                                                                <Typography gutterBottom variant="h5" component="h2">
                                                                    {`${cName2?.c1name2}`}
                                                                </Typography>
                                                                <Typography variant="body2" color="textSecondary" component="p">
                                                                    {`Mastery Level at ${prop21[0].championLevel} with ${prop21[0].championPoints} points`}
                                                                </Typography>
                                                            </Box>
                                                        </CardContent>

                                                    </Card>
                                                </CardActionArea>

                                                <CardActionArea component={RouterLink} to={`/champions/${cName2?.c2name2.replace(/\s+/g, '')}`}>
                                                    <Card>
                                                        <CardMedia
                                                            component="img"
                                                            alt="Champion Pic"
                                                            height="100"

                                                            image={`http://ddragon.leagueoflegends.com/cdn/11.9.1/img/champion/${cName2?.c2name2.replace(/\s+/g, '')}.png`}
                                                            title="Champion"
                                                        />
                                                        <CardContent>
                                                            <Box textAlign="center">
                                                                <Typography gutterBottom variant="h5" component="h2">
                                                                    {`${cName2?.c2name2}`}
                                                                </Typography>
                                                                <Typography variant="body2" color="textSecondary" component="p">
                                                                    {`Mastery Level at ${prop21[1].championLevel} with ${prop21[1].championPoints} points`}
                                                                </Typography>
                                                            </Box>
                                                        </CardContent>

                                                    </Card>
                                                </CardActionArea>

                                                <CardActionArea component={RouterLink} to={`/champions/${cName2?.c3name2.replace(/\s+/g, '')}`}>
                                                    <Card>
                                                        <CardMedia
                                                            component="img"
                                                            alt="Champion Pic"
                                                            height="100"

                                                            image={`http://ddragon.leagueoflegends.com/cdn/11.9.1/img/champion/${cName2?.c3name2.replace(/\s+/g, '')}.png`}
                                                            title="Champion"
                                                        />
                                                        <CardContent>
                                                            <Box textAlign="center">
                                                                <Typography gutterBottom variant="h5" component="h2">
                                                                    {`${cName2?.c3name2}`}
                                                                </Typography>

                                                                <Typography variant="body2" color="textSecondary" component="p">
                                                                    {`Mastery Level at ${prop21[2].championLevel} with ${prop21[2].championPoints} points`}
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
                                    {stats2 !== null ?
                                        <div style={{ width: "100%" }}>
                                            <Box textAlign="center" p={3}>
                                                <Typography variant="h3">Match Statistics:</Typography>
                                            </Box>

                                            <Grid >
                                                <Grid >
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
                                                                        {`League Points: ${stats2[0].leaguePoints}`}
                                                                    </Typography>
                                                                </Box>
                                                            </CardContent>
                                                        </Card>

                                                        <Card>
                                                            <CardContent>
                                                                <Box textAlign="center">
                                                                    <Typography gutterBottom variant="subtitle2" component="h3">
                                                                        {`Wins: ${stats2[0].wins}`}
                                                                    </Typography>
                                                                </Box>
                                                            </CardContent>
                                                        </Card>

                                                        <Card>
                                                            <CardContent>
                                                                <Box textAlign="center">
                                                                    <Typography gutterBottom variant="subtitle2" component="h3">
                                                                        {`Losses: ${stats2[0].losses}`}
                                                                    </Typography>
                                                                </Box>
                                                            </CardContent>
                                                        </Card>

                                                        <Card>
                                                            <CardContent>
                                                                <Box textAlign="center">
                                                                    {stats2[0].tier !== undefined ?
                                                                        <Typography gutterBottom variant="subtitle2" component="h3">
                                                                            {`Tier: ${stats2[0].tier} ${stats2[0].rank}`}
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
                                                                        {`League Points: ${stats2[1].leaguePoints}`}
                                                                    </Typography>
                                                                </Box>
                                                            </CardContent>
                                                        </Card>

                                                        <Card>
                                                            <CardContent>
                                                                <Box textAlign="center">
                                                                    <Typography gutterBottom variant="subtitle2" component="h3">
                                                                        {`Wins: ${stats2[1].wins}`}
                                                                    </Typography>
                                                                </Box>
                                                            </CardContent>
                                                        </Card>

                                                        <Card>
                                                            <CardContent>
                                                                <Box textAlign="center">
                                                                    <Typography gutterBottom variant="subtitle2" component="h3">
                                                                        {`Losses: ${stats2[1].losses}`}
                                                                    </Typography>
                                                                </Box>
                                                            </CardContent>
                                                        </Card>

                                                        <Card>
                                                            <CardContent>
                                                                <Box textAlign="center">
                                                                    {stats2[1].tier !== undefined ?
                                                                        <Typography gutterBottom variant="subtitle2" component="h3">
                                                                            {`Tier: ${stats2[1].tier} ${stats2[1].rank}`}
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
                                                                        {`League Points: ${stats2[2].leaguePoints}`}
                                                                    </Typography>
                                                                </Box>
                                                            </CardContent>
                                                        </Card>

                                                        <Card>
                                                            <CardContent>
                                                                <Box textAlign="center">
                                                                    <Typography gutterBottom variant="subtitle2" component="h3">
                                                                        {`Wins: ${stats2[2].wins}`}
                                                                    </Typography>
                                                                </Box>
                                                            </CardContent>
                                                        </Card>

                                                        <Card>
                                                            <CardContent>
                                                                <Box textAlign="center">
                                                                    <Typography gutterBottom variant="subtitle2" component="h3">
                                                                        {`Losses: ${stats2[2].losses}`}
                                                                    </Typography>
                                                                </Box>
                                                            </CardContent>
                                                        </Card>

                                                        <Card>
                                                            <CardContent>
                                                                <Box textAlign="center">
                                                                    {stats2[2].tier !== undefined ?
                                                                        <Typography gutterBottom variant="subtitle2" component="h3">
                                                                            {`Tier: ${stats2[2].tier} ${stats2[2].rank}`}
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
                    </item>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}