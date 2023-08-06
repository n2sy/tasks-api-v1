import { Body, Controller, Get, Headers, NotFoundException, Param, Post, Query, Req, Res, ValidationPipe } from '@nestjs/common';
import { Request, Response, query } from 'express';
import { TaskDTO } from 'src/DTO/taskDTO';
import { Task } from 'src/models/task';

@Controller('tasks')
export class TasksController {
    allTasks : Task[] =[];

    @Get('all')
    getAllTasks(@Req() req : Request, @Res() res : Response, @Headers() headers : Headers, @Query() qm) {
        //res.status(200).json({message : "All Tasks"});
        //console.log(headers);
        console.log(qm);
        let selTasks = [];
        if(qm.search) {
            selTasks = this.allTasks.filter((t) => t.statut.includes(qm['search']));
            res.json({allTasks : selTasks})
        }
        else
            res.json({allTasks : this.allTasks})
    }

    @Get('all/v1/:id')
    getOneTasks(@Req() req : Request, @Res() res : Response, @Param() myParams) {
       let task = this.allTasks.find((t) => t.id == myParams['id'])
        
        res.json({selectedTask : task})
    }

    @Get('all/:id')
    getOneTasks2(@Req() req : Request, @Res() res : Response, @Param('id') myId) {
       let task = this.allTasks.find((t) => t.id == myId)
    //    let task = this.allTasks.find((t) => t.id === myId)
        if(task)
            res.json({selectedTask : task})
        else
            throw new NotFoundException("Ce task n'existe pas")
    }

    @Post('new')
    addNewTask(@Body() newTask) {
        console.log(newTask);
    }
    
    @Post('new2')
    addNewTask2(@Body('title') title, @Body('statut') st) {
        console.log(title, st);
    }

    // With Models
    @Post('new3')
    // addNewTask3(@Body() newTask : Partial<Task>) {
    addNewTask3(@Body() newTask : Task) {
        // Verify object implements an interface
        // console.log('title' in newTask && 'description' in newTask);
        if(this.allTasks.length)
            newTask.id = this.allTasks[this.allTasks.length - 1].id + 1;
        else
        newTask.id = 0;
        this.allTasks.push(newTask);
    }

    //with DTO
    @Post('new4')
    // addNewTask3(@Body() newTask : Partial<Task>) {
    addNewTask4(@Body(ValidationPipe) newTask : TaskDTO) {
        // Verify object implements an interface
        // console.log('title' in newTask && 'description' in newTask);
        let newId;
        console.log(newTask instanceof TaskDTO);
        console.log(newTask);
        
        
        if(this.allTasks.length)
            newId = this.allTasks[this.allTasks.length - 1].id + 1  
        else
            newId = 0;
        
        this.allTasks.push({
            id : newId,
            title : newTask.title,
            description : newTask.description,
            statut : newTask.statut,
            createdAt : new Date()
        });
    }
}
