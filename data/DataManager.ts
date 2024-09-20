import AsyncStorage from "@react-native-async-storage/async-storage";
import data from '@/data/AchievementsData.json';

export interface IStorageData {
    audio: boolean;
    version: number;
    data: {
        [expansion: string]: {
            scenarios: IAchievementData[],
            normal: IAchievementData[],
            restrictions: IAchievementData[]
        }
    }
    // scenarios: IAchievementData[];
    currentMode: string;
    currentLang: string;
}

export interface IAchievementData {
    id: number;
    completed: boolean;
}

export default class DataManager {
    private storageData!: IStorageData;
    private localData: { [key: number]: any } = {};
    private dataVersion: number = 0.7;

    public allUnlocked: boolean = false;

    private static _instance: DataManager;

    public static get instance(): DataManager {
        if (!this._instance) {
            this._instance = new DataManager();
        }

        return this._instance;
    }

    public static init(): DataManager {
        return DataManager.instance;
    }

    public constructor() {
        DataManager._instance = this;
        this.initData();
        this.loadData();
        console.log('[DataManager] storageData: ' +JSON.stringify(this.storageData));
    }

    private initData(): void {
        this.storageData = {
            audio: true,
            version: this.dataVersion,
            data: {
                ['base']: {
                    scenarios: [],
                    normal: [],
                    restrictions: []
                },
                ['landmarks']: {
                    scenarios: [],
                    normal: [],
                    restrictions: []
                }
            },
            currentMode: 'base',
            currentLang: 'en'
        };
        for (let i: number = 0; i < Object.keys(data).length; i++) {
            const mode: string = Object.keys(this.storageData.data)[i];
            for (let j: number = 0; j < (data as any)[mode].scenarios.length; j++) {
                this.storageData.data[mode].scenarios.push({ id: i, completed: false });  
            }
            for (let j: number = 0; j < (data as any)[mode].normal_achievements.length; j++) {
                this.storageData.data[mode].normal.push({ id: i, completed: false });  
            }
            for (let j: number = 0; j < (data as any)[mode].restrictions.length; j++) {
                this.storageData.data[mode].restrictions.push({ id: i, completed: false });  
            }
        }
    }

    private loadData = async () => {
        try {
          const value = await AsyncStorage.getItem('version');
          
          if (value !== null) { // && JSON.parse(value).version === this.storageData.version
            // value previously stored
            this.storageData = JSON.parse(value);
          } else {
            this.initData();
            this.saveData(this.storageData);
          }
        } catch (e) {
          // error reading value
        }
      };

    private saveData = async (value: any) => {
        try {
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem('version', jsonValue);
        } catch (e) {
          // saving error
          console.log('Error: ', e);
        }
      };

    public getScenarios(): IAchievementData[] {
        return this.storageData.data[this.storageData.currentMode].scenarios.slice();
    }

    public getScenario(index: number): IAchievementData {
        return this.storageData.data[this.storageData.currentMode].scenarios[index];
    }

    public setScenarioCompletedState(id: number, completed: boolean): void {
        this.storageData.data[this.storageData.currentMode].scenarios[id].completed = completed;
        this.saveData(this.storageData);
    }
    

    public isScenarioCompleted(id: number): boolean {
        return this.storageData.data[this.storageData.currentMode].scenarios[id].completed;
    }

    public getTotalScenarios(): number {
        return this.storageData.data[this.storageData.currentMode].scenarios.length;
    }

    public getCompletedScenariosCount(): number {
        let count: number = 0;
        for (let i: number = 0; i < this.getTotalScenarios() - 1; i++) {
            if (this.storageData.data[this.storageData.currentMode].scenarios[i].completed) {
                count += 1;
            }
        }
        return count;
    }

    public setAchievementCompletedState(id: number, type: 'normal' | 'restriction', completed: boolean): void {
        if (type === 'normal') {
            this.storageData.data[this.storageData.currentMode].normal[id].completed = completed;
        } else if (type === 'restriction') {
            this.storageData.data[this.storageData.currentMode].restrictions[id].completed = completed;
        }
        this.saveData(this.storageData);
    }

    public getAchievementState(id: number, type: 'normal' | 'restriction'): boolean {
        if (type === 'normal') {
            return this.storageData.data[this.storageData.currentMode].normal[id].completed;
        } else if (type === 'restriction') {
            return this.storageData.data[this.storageData.currentMode].restrictions[id].completed;
        }
        return false;
    }

    public getTotalAchievements(type: 'normal' | 'restriction'): number {
        if (type === 'normal') {
            return this.storageData.data[this.storageData.currentMode].normal.length;
        } else {
            return this.storageData.data[this.storageData.currentMode].restrictions.length;
        }
    }

    public getCompletedAchievementsCount(type: 'normal' | 'restriction'): number {
        let count: number = 0;
        if (type === 'normal') {
            for (let i: number = 0; i < this.getTotalAchievements(type) - 1; i++) {
                if (this.storageData.data[this.storageData.currentMode].normal[i].completed) {
                    count += 1;
                }
            }
        } else {
            for (let i: number = 0; i < this.getTotalAchievements(type) - 1; i++) {
                if (this.storageData.data[this.storageData.currentMode].restrictions[i].completed) {
                    count += 1;
                }
            }
        }
        return count;
        
    }

    public setCurrentMode(mode: string): void {
        this.storageData.currentMode = mode;
        this.saveData(this.storageData);
    }

    public getCurrentMode(): string {
        return this.storageData.currentMode;
    }

    public getGoldMedals(): number {
        // let counter: number = 0;
        // for (let i: number = 0; i < this.storageData.scenarios.length; i++) {
        //     const score: number = this.storageData.scenarios[i].highscore;
        //     if (score >= 130) {
        //         counter += 1;
        //     }
        // }
        // return counter;
        return 10;
    }

    public getTotalGoldMedals(): number {
        // return this.storageData.scenarios.length;
        return 1;
    }

    public getCurrentLang(): string {
        return this.storageData.currentLang;
    }

    public setCurrentLanguage(lang: string): void {
        this.storageData.currentLang = lang;
        this.saveData(this.storageData);
    }


    // public clearData(): void {
    //     cc.sys.localStorage.clear();
    //     this.initData();
    //     this.saveAllData();
    // }

}
