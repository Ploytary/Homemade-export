type TriggerType = 'click' | 'mouseover' | 'keydown';
interface ChangeIndexHandler {
  (element: HTMLElement, index: number, isActive: boolean): void;
}
interface GroupHandlerRecord {
  group: HTMLElement[];
  handler: ChangeIndexHandler;
}

export class BindElementGroups {
  private currentIndex = 0;
  private masterGroup: HTMLElement[];
  private slaveGroups: HTMLElement[][];
  private activeClass = 'bind-group-active-item';
  private currentTriggerType: TriggerType = 'click';
  private groupHandlerList: GroupHandlerRecord[] = [];

  constructor(masterGroup: HTMLElement[], ...slaveGroups: HTMLElement[][]) {
    this.masterGroup = masterGroup;
    this.slaveGroups = slaveGroups;

    this.setChangeIndexTrigger(this.currentTriggerType);
    setTimeout(() => this.setIndex(this.currentIndex), 0);
  }

  public setChangeIndexTrigger(trigger: TriggerType): void {
    const oldTriggerType = this.currentTriggerType;
    for (const element of this.masterGroup) {
      element.removeEventListener(oldTriggerType, this.mouseEventHandler);
      element.addEventListener(trigger, this.mouseEventHandler);
    }
    this.currentTriggerType = trigger;
  }

  public setChangeIndexHandler(handler: ChangeIndexHandler, forGroup?: HTMLElement[]): void {
    const allGroups = [...this.slaveGroups, this.masterGroup];
    let appliedToGroups: HTMLElement[][] = [];
    if (forGroup) {
      if (allGroups.includes(forGroup)) {
        appliedToGroups = [forGroup];
      } else {
        console.warn('group is not part of binding groups');
      }
    } else {
      appliedToGroups = allGroups;
    }

    for (const group of appliedToGroups) {
      this.groupHandlerList.push({ group, handler });
    }
  }

  public setActiveClass(value: string): void {
    this.activeClass = value;
  }

  public getCurrentIndex(): number {
    return this.currentIndex;
  }

  private mouseEventHandler = (evt: Event): void => {
    const index = this.masterGroup.indexOf(evt.currentTarget as HTMLElement);
    index !== this.currentIndex && index !== -1 && this.setIndex(index);
  };

  private setIndex(value: number): void {
    this.currentIndex = value;
    this.updateElements();
  }

  private updateElements(): void {
    const allGroups = [...this.slaveGroups, this.masterGroup];
    for (const group of allGroups) {
      group.forEach((element) =>
        element.classList.toggle(this.activeClass, this.currentIndex === group.indexOf(element))
      );
    }
    this.runRegisteredHandlers();
  }

  private runRegisteredHandlers(): void {
    this.groupHandlerList.forEach((record) => {
      const { group, handler } = record;
      group.forEach((element, index) => handler(element, index, index === this.currentIndex));
    });
  }
}
