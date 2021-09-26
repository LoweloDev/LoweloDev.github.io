package com.studenthub.logic.tasks;

import com.studenthub.logic.IFetchService;
import org.springframework.core.task.TaskExecutor;


public class FetchTask {

    private class fetchTask implements Runnable {

        private final IFetchService callback;

        public fetchTask(IFetchService callback) {
            this.callback = callback;
        }

        public void run() {
            this.callback.fetch();
        }

    }

    private final TaskExecutor taskExecutor;

    public FetchTask(TaskExecutor taskExecutor) {
        this.taskExecutor = taskExecutor;
    }

    public void executeTask(IFetchService callback) {
        taskExecutor.execute(new fetchTask(callback));
    }
}