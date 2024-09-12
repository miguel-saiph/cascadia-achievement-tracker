import AsyncStorage from "@react-native-async-storage/async-storage";
import data from '@/data/AchievementsData.json';

export interface IStorageData {
    audio: boolean;
    version: number;
    scenarios: IScenarioData[];
    lastScenario: number;
    currentLang: string;
}

export interface IScenarioData {
    id: number;
    completed: boolean;
}

export default class DataManager {
    private storageData!: IStorageData;
    private localData: { [key: number]: any } = {};
    private dataVersion: number = 0.4;

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
            scenarios: [],
            lastScenario: 0,
            currentLang: 'en'
        };
        for (let i: number = 0; i < data.scenarios.length; i++) {
            this.storageData.scenarios.push({ id: i, completed: false });   
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

    public getScenarios(): IScenarioData[] {
        return this.storageData.scenarios.slice();
    }

    public getScenario(index: number): IScenarioData {
        return this.storageData.scenarios[index];
    }

    public setScenarioCompletedState(id: number, completed: boolean): void {
        this.storageData.scenarios[id].completed = completed;
        this.saveData(this.storageData);
    }

    public isScenarioCompleted(id: number): boolean {
        return this.storageData.scenarios[id].completed;
    }

    public setLastScenario(id: number): void {
        this.storageData.lastScenario = id;
        this.saveData(this.storageData);
    }

    public getLastScenario(): number {
        return this.storageData.lastScenario;
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
        return this.storageData.scenarios.length;
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
