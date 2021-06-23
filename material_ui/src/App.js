import React from 'react';
import {Button, IconButton, Toolbar, Typography, AppBar} from "@material-ui/core";
import {Delete,AccessAlarm,DeleteOutline,Add,KeyboardVoice,Save,Home,ThumbUp,ThumbDown,Menu,} from '@material-ui/icons';
import {green, lightBlue, pink, purple, red} from '@material-ui/core/colors'
import {Icon} from '@material-ui/core'



function App() {
      // eslint-disable-next-line react-hooks/rules-of-hooks
    return (
        <div>
            {/*实行*/}
            <div>
                <Button variant={'contained'} >
                    Default
                </Button>
                <Button variant={'contained'} color={'primary'}>
                    Primary
                </Button>
                <Button variant={'contained'} color={'secondary'}>
                    Secondary
                </Button>
                <Button variant={'contained'} disabled>
                    Disabled
                </Button>
                <Button variant={'contained'} color={'primary'} href={'https://www.google.com.tw'}>
                    Google
                </Button>
                <Button variant={'contained'} color={'primary'} href={'https://www.baidu.com'} disableElevation>
                    Baidu
                </Button>
            </div>
            <div>
                <Button>
                    default
                </Button>
                <Button color={'primary'}>
                    primary
                </Button>
                <Button color={'secondary'}>
                    secondary
                </Button>
                <Button disabled>
                    disabled
                </Button>
            </div>
            <div>
                <Button variant={'outlined'}>
                    default
                </Button>
                <Button color={'primary'} variant={'outlined'}>
                    primary
                </Button>
                <Button color={'secondary'} variant={'outlined'}>
                    secondary
                </Button>
                <Button disabled variant={'outlined'}>
                    disabled
                </Button>
            </div>
            <div>
                <Button onClick={()=>{alert("hello")}} variant={'contained'} color={'primary'}>
                    hello
                </Button>
            </div>
            <div>
                <IconButton aria-label={'delete'} >
                    <DeleteOutline fontSize='large' color={'primary'}/>
                </IconButton>
                <IconButton aria-label={'delete'}>
                    <Delete fontSize={'small'} color={'secondary'}/>
                </IconButton>
                <IconButton aria-label={'add'}>
                    <Add fontSize={'large'} color={'secondary'}/>
                </IconButton>
                <IconButton>
                    <AccessAlarm fontSize={'small'} color={'primary'}/>
                </IconButton>
                <IconButton>
                    <Home fontSize={'large'} style={{color:purple[700]}}/>
                </IconButton>
            </div>
            <div>
               <Button
                variant={'contained'} color={'secondary'} startIcon={<Delete/>}>
                   Delete
               </Button>
                <Button variant={'outlined'} color={'primary'} endIcon={<KeyboardVoice/>} size={'large'} disabled>
                    Talk
                </Button>
                <Button variant={'contained'}  style={{backgroundColor:red.A700}} startIcon={<Save/>} size={'large'}>
                    Save
                </Button>
            </div>
            <div>
                <Icon>star</Icon>
                <Icon color={'primary'}>star</Icon>
                <Icon color={'secondary'}>star</Icon>
                <Icon style={{color:green[700]}}>star</Icon>
            </div>
            <div>
                <IconButton>
                    <ThumbUp style={{color:lightBlue[500]}} fontSize={'small'}/>
                </IconButton>
                <IconButton>
                    <ThumbDown style={{color:pink[500]}} fontSize={'small'}/>
                </IconButton>
            </div>
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu />
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        <Button color="secondary" variant={'contained'} >Login</Button>
                    </Toolbar>
                </AppBar>
            </div>

        </div>
    );


}

export default App;
