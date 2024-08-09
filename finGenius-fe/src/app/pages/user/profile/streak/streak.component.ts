import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RewardService } from '../../../../services/reward.service';
import { IReward } from '../../../../types/reward.interface';
import { UserService } from '../../../../services/user.service'; // Assuming UserService is already set up to fetch user details

@Component({
  selector: 'app-streak',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './streak.component.html',
  styleUrls: ['./streak.component.scss']
})
export class StreakComponent implements OnInit {
  rewards: IReward[] = [];
  currentStreak: number = 0; // Assuming this will hold the user's current streak

  constructor(
    private readonly location: Location,
    private readonly rewardsService: RewardService,
    private readonly userService: UserService // Assuming UserService provides access to the user's streak
  ) {}

  ngOnInit() {
    this.fetchUserDetails();
    this.fetchRewards();
  }

  fetchUserDetails() {
    // Assume getUserDetails returns an observable with user data including 'streak'
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.currentStreak = user.data.streak;
      },
      error: (err) => console.error('Failed to fetch user details:', err)
    });
  }

  fetchRewards() {
    this.rewardsService.getAllReward().subscribe({
      next: (response) => {
        this.rewards = response.data;
      },
      error: (err) => {
        console.error('Failed to fetch rewards:', err);
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
