export abstract class FeatureTodoEditPort {
  abstract edit(payload: { id: string; title: string; description: string; resolved: boolean }): void;
}
